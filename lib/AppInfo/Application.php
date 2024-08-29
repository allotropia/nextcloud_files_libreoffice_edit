<?php

declare(strict_types=1);

namespace OCA\FilesLibreOfficeEdit\AppInfo;

use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCA\Files\Event\LoadAdditionalScriptsEvent;

use OCA\FilesLibreOfficeEdit\Listener\LoadAdditionalListener;

class Application extends App implements IBootstrap {
	public const APP_ID = 'fileslibreofficeedit';

	/** @psalm-suppress PossiblyUnusedMethod */
	public function __construct() {
		parent::__construct(self::APP_ID);
	}

	public function register(IRegistrationContext $context): void {
		$context->registerEventListener(LoadAdditionalScriptsEvent::class, LoadAdditionalListener::class);
	}

	public function boot(IBootContext $context): void {
	}
}
