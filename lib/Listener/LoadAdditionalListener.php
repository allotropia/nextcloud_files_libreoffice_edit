<?php declare(strict_types=1);

namespace OCA\FilesLibreOfficeEdit\Listener;

use OCA\FilesLibreOfficeEdit\AppInfo\Application;

use OCA\Files\Event\LoadAdditionalScriptsEvent;
use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Util;

class LoadAdditionalListener implements IEventListener {
	public function handle(Event $event): void {
		if (!($event instanceof LoadAdditionalScriptsEvent)) {
			return;
		}

		Util::addInitScript(Application::APP_ID, 'files-action');
	}
}
