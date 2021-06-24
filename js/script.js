(function () {

	var FilesLibreOfficeEditPlugin = {
		attach: function (fileList) {
			var self = this

			fileList.fileActions.registerAction({
				name: 'EditWithLibreOffice',
				displayName: t('fileslibreofficeedit', 'Edit with LibreOffice'),
				mime: 'all',
				order: 100,
				iconClass: 'icon-edit',
				permissions: OC.PERMISSION_UPDATE,
				actionHandler: self.editWithLO
			})
		},

		editWithLO: function (fileName, context) {
			var dir = context.dir || context.fileList.getCurrentDirectory();
			var isDir = context.$file.attr('data-type') === 'dir';
			var url = "vnd.libreoffice.command:ofe|u|" + window.location.protocol
				+ "//" + window.location.host + context.fileList.getDownloadUrl(fileName, dir, isDir);
			if (url) {
				OCA.Files.Files.handleDownload(url, null);
			}
		}
	};

	OC.Plugins.register('OCA.Files.FileList', FilesLibreOfficeEditPlugin)

})();
