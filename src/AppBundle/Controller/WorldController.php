<?php 
namespace AppBundle\Controller;

require_once __DIR__.'/../../../vendor/autoload.php';


use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class WorldController
{
    /**
    *       @Route("/helloworld")
    */
    public function webSocketPageAction() {
    $process = new Process('perl dataserv');
    $process->start();
        return new Response(
            '<html><body><h1>Test time...</h1>
<div id="datatable"></div>
<input id="echobox" type="textfield"/>
<script type="text/javascript" src="SocketListen.js"></script>
</body></html>'
        );
    }
}
?>
