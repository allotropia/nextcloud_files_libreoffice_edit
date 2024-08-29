# Nextcloud Files - Edit with LibreOffice

Nextcloud App to edit files directly in LibreOffice (via WebDav).

Requires at least:
* LibreOffice 5.3 (on Windows)
* LibreOffice 7.2 (on Linux)

Doesn't seem to work on macOS currently (See issue [#6](https://github.com/allotropia/nextcloud_files_libreoffice_edit/issues/6))

## Automatic install

Install from the [Nextcloud app store](https://apps.nextcloud.com/apps/fileslibreofficeedit).

## Manual install

Place this app in **nextcloud/apps/**

## Translations

Help translate this app at [Nextcloud Transifex](https://www.transifex.com/nextcloud/nextcloud).

## Building the app

For developing, build the app (with automatic rebuilding when changes are done) using:

    `npm run watch`

## Building a release

To build a release, use `make && make appstore`.

The following things to be present:

* make
* which
* tar: for building the archive
* curl: used if phpunit and composer are not installed to fetch them from the web
* npm: for building and testing everything JS, only required if a package.json is placed inside the **js/** folder

The make command will install or update Composer dependencies and also **npm run build**.

## Release procedure

* **IMPORTANT:** Make sure that this directory is name `fileslibreofficeedit` and not `nextcloud_files_libreoffice_edit` or other names, otherwise the build scripts will produce unusable artifacts.
* Update CHANGELOG.md
* Update version number in `appinfo/info.xml`
* Commit changes & create a tag
  * git tag -a `v1.0.3`
* `git push && git push --tags`
* Build the appstore package: `make && make appstore`
* The archive is located in `build/artifacts/appstore`
* Create a new github release and upload the release artifact there
  * https://github.com/allotropia/nextcloud_files_libreoffice_edit/releases
  * Release title: e.g. `v1.0.3`
  * Description: Add changes from the changelog
* Create a new extension release in Nextcloud store
  * https://apps.nextcloud.com/developer/apps/releases/new
  * Insert the link to the github release binary (e.g. `https://github.com/allotropia/nextcloud_files_libreoffice_edit/releases/download/v1.0.3/fileslibreofficeedit.tar.gz`)
  * Create signature as described
* Done!
