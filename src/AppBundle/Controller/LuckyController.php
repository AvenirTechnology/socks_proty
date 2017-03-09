<?php
namespace AppBundle\Controller;

require_once __DIR__.'/../../../../vendor/autoload.php';

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Process\Process;

class LuckyController {
/**
*@Route("/hello_world")
**/

    public function websocketpageaction() {

        $process = new Process('perl echoserv');
        $process->start();

        return new Response(
            '<html><body><input id = "textbox" type = "textfield"/><script type = "text/javascript" src = "socketlistener.js"></script></body></html>'
        );
    }
}
?>
