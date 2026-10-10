## 3.0.2
* Also refresh the file in the Files UI once LibreOffice releases the lock again
  (i.e. the file was closed), so the lock icon disappears without a manual page reload

## 3.0.1
* Refresh the file in the Files UI once LibreOffice has locked it, so the lock icon
  appears without a manual page reload

## 3.0.0
* Rewrite to support Nextcloud >= 33 (fixes #39, #37): `@nextcloud/files` v4 changed the
  `FileAction`/`registerFileAction` API (destructured `exec`/`enabled` context, no more
  `FileAction` class), which broke the "Edit with LibreOffice" action on Nextcloud Hub 26
  Winter (33) and later.

## 2.0.1
* Don't register default action for files (fixes #33)

## 2.0.0
* Rewrite to support Nextcloud >= 28 (fixes #29)

## 1.1.1
* Limit old version to Nextcloud <= 27 due to incompatible API Changes

## 1.1.0
* Add translations for many languages

## 1.0.4
* #10 Previous release had wrong version number in app info

## 1.0.3
* Add info about LibreOffice versions to app description

## 1.0.2
* Only show context menu on supported file types

## 1.0.1
* Add missing max-version element

## 1.0.0
- Initial release
