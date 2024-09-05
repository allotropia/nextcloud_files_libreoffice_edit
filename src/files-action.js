import { DefaultType, FileAction, Permission, registerFileAction } from '@nextcloud/files'
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

registerFileAction(new FileAction({
	id: 'fileslibreofficeedit-edit',
	displayName: () => t('fileslibreofficeedit', 'Edit with LibreOffice'),
	enabled: (nodes) => {
		if (nodes.length !== 1) {
			return false
		}
		const node = nodes[0]
		return supportedMimetypes.includes(node.mime) && (node.permissions & Permission.READ)
	},
	iconSvgInline: () => DocSvg,
	async exec(node, view, dir) {
		const url = 'vnd.libreoffice.command:ofe|u|' + node.source
		window.location = url
	},
}))
