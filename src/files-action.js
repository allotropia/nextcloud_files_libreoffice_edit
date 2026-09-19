import { Permission, registerFileAction } from '@nextcloud/files'
import { defaultRootPath, getClient, getDefaultPropfind, resultToNode } from '@nextcloud/files/dav'
import { emit } from '@nextcloud/event-bus'
/* eslint-disable-next-line import/no-unresolved */
import DocSvg from '@mdi/svg/svg/file-document-outline.svg?raw'

const supportedMimetypes = [
	'text/plain',

	'application/vnd.oasis.opendocument.formula',
	'application/vnd.oasis.opendocument.graphics',
	'application/vnd.oasis.opendocument.presentation',
	'application/vnd.oasis.opendocument.spreadsheet',
	'application/vnd.oasis.opendocument.text',
	'application/vnd.oasis.opendocument.text-template',
	'application/vnd.oasis.opendocument.spreadsheet-template',
	'application/vnd.oasis.opendocument.presentation-template',
	'application/vnd.oasis.opendocument.graphics-template',

	'application/msword',
	'application/vnd.ms-word.document.macroEnabled.12',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.template',

	'application/vnd.ms-excel',
	'application/vnd.ms-excel.addin.macroEnabled.12',
	'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
	'application/vnd.ms-excel.sheet.macroEnabled.12',
	'application/vnd.ms-excel.template.macroEnabled.12',
	'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	'application/vnd.openxmlformats-officedocument.spreadsheetml.template',

	'application/vnd.ms-powerpoint',
	'application/vnd.ms-powerpoint.template.macroEnabled.12',
	'application/vnd.ms-powerpoint.addin.macroEnabled.12',
	'application/vnd.ms-powerpoint.slideshow.macroEnabled.12',
	'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
	'application/vnd.openxmlformats-officedocument.presentationml.presentation',
	'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
	'application/vnd.openxmlformats-officedocument.presentationml.template',
]

// LibreOffice locks (and later unlocks) the file asynchronously - once it has
// launched and connected via WebDAV, and once the user closes it again - so we
// poll for the lock state to change and refresh the Files UI as soon as it
// does, instead of requiring a page reload.
const LOCK_POLL_DELAYS_MS = [1000, 2000, 3000, 5000, 8000, 13000, 21000]
const UNLOCK_POLL_INTERVAL_MS = 15000
const UNLOCK_POLL_MAX_DURATION_MS = 4 * 60 * 60 * 1000 // give up after 4h

const isLocked = (node) => {
	const lock = node.attributes?.lock
	return lock === true || lock === 1 || lock === '1' || lock === 'true'
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function fetchNode(node) {
	const client = getClient()
	const path = `${defaultRootPath}${node.path}`
	const response = await client.stat(path, {
		details: true,
		data: getDefaultPropfind(),
	})
	return resultToNode(response.data)
}

async function watchNodeLock(node) {
	let lockedNode
	for (const delay of LOCK_POLL_DELAYS_MS) {
		await sleep(delay)

		try {
			const updatedNode = await fetchNode(node)
			if (isLocked(updatedNode)) {
				lockedNode = updatedNode
				emit('files:node:updated', updatedNode)
				break
			}
		} catch (error) {
			// The file may be briefly unavailable while LibreOffice connects, just retry
		}
	}

	if (!lockedNode) {
		return
	}

	// The file is locked now, so keep watching for it to become unlocked again
	// (i.e. the user closed LibreOffice) and refresh the UI once more.
	const deadline = Date.now() + UNLOCK_POLL_MAX_DURATION_MS
	while (Date.now() < deadline) {
		await sleep(UNLOCK_POLL_INTERVAL_MS)

		try {
			const updatedNode = await fetchNode(node)
			if (!isLocked(updatedNode)) {
				emit('files:node:updated', updatedNode)
				return
			}
		} catch (error) {
			// The file may be briefly unavailable, just retry
		}
	}
}

registerFileAction({
	id: 'fileslibreofficeedit-edit',
	displayName: () => t('fileslibreofficeedit', 'Edit with LibreOffice'),
	enabled: ({ nodes }) => {
		if (nodes.length !== 1) {
			return false
		}
		const node = nodes[0]
		return supportedMimetypes.includes(node.mime) && (node.permissions & Permission.READ)
	},
	iconSvgInline: () => DocSvg,
	async exec({ nodes }) {
		const node = nodes[0]
		const url = 'vnd.libreoffice.command:ofe|u|' + node.source
		window.location = url

		watchNodeLock(node)
	},
})
