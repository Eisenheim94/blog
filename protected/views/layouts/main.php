<?php /* @var $this Controller */ ?>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="language" content="en">
	<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/style.css">
	<base href="/">

	<title><?php echo CHtml::encode($this->pageTitle); ?></title>
</head>
<body>

	<div class="header">
		<div class="wrapper">
			<div class="logo"><a href="#index"></a></div>

			<div class="menu">
				<?php $this->widget('zii.widgets.CMenu',array(
			'items'=>array(
				/*array('label'=>'Home', 'url'=>array('/site/index')),
				array('label'=>'Settings', 'url'=>array('/site/contact')),
				array('label'=>'Login', 'url'=>array('/site/login'), 'visible'=>Yii::app()->user->isGuest),
				array('label'=>'Logout ('.Yii::app()->user->name.')', 'url'=>array('/site/logout'), 'visible'=>!Yii::app()->user->isGuest)*/
				array('label'=>'Home', 'url'=>array('#page/index')),
				array('label'=>'Settings', 'url'=>array('#page/settings')),
				array('label'=>'Login', 'url'=>array('#user/login'), 'visible'=>Yii::app()->user->isGuest),
				array('label'=>'Logout ('.Yii::app()->user->name.')', 'url'=>array('#user/logout'), 'visible'=>!Yii::app()->user->isGuest)
			),
		)); ?>
			</div><!-- mainmenu -->

		</div>
	</div>
	
    <div class="wrapper">


        <div id="block_content">

            <div class="sidebar">
				<div class="person">
					<img src="images/pic.png" class="picture">
					<p>Demid Ganenko</p>
            	</div>
				<div class="person__block">
					<p>Posts:</p>
					<span id="posts">23</span>
				</div>
				<div class="person__block">
					<p>Stars:</p>
					<span id="posts">5</span>
				</div>
				<div class="person__block">
					<p>Likes:</p>
					<span id="posts">7</span>
				</div>
            </div>

            <div class="content">
				<div id="main"></div>
                <?php //echo $content; ?>
            </div>

        </div>

    </div>

		<script type="text/template" id="page-template">
			<h2>Page id: <%- id %></h2>
			<!--p>Page content: <%- $(this).html(content) %></p-->
			<p>Page content: <%- $(this).find('p').html(content) %></p>
		</script>
		<script type="text/template" id="post-template">
			<h2><%- author %> <span class="date">at <%- date %></span></h2>
			<p><%- content %></p>
			<div class="destroy"></div>
		</script>
		<script src="js/lib/jquery-1.7.1.js"></script>
		<script src="js/lib/underscore.js"></script>
		<script src="js/lib/backbone.js"></script>
		<!--script src="js/models/page.js"></script>
		<script src="js/collections/pages.js"></script-->
		<script src="js/views/posts.js"></script>
		<script src="js/views/pages.js"></script>
		<script src="js/views/app.js"></script>
		<script src="js/app.js"></script>
		<script src="js/routers/router.js"></script>
</body>
</html>


