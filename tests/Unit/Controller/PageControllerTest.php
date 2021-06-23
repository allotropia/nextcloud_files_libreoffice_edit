<?php

namespace OCA\FilesLibreOfficeEdit\Tests\Unit\Controller;

use PHPUnit_Framework_TestCase;

use OCP\AppFramework\Http\TemplateResponse;

use OCA\FilesLibreOfficeEdit\Controller\PageController;


class PageControllerTest extends PHPUnit_Framework_TestCase {
	private $controller;
	private $userId = 'john';

	public function setUp() {
		$request = $this->getMockBuilder('OCP\IRequest')->getMock();

		$this->controller = new PageController(
			'fileslibreofficeedit', $request, $this->userId
		);
	}

	public function testIndex() {
		$result = $this->controller->index();

		$this->assertEquals('index', $result->getTemplateName());
		$this->assertTrue($result instanceof TemplateResponse);
	}

}
