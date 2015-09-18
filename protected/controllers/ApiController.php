<?php

class ApiController extends Controller
{
	/**
	 * Declares class-based actions.
	 */
	public function actions()
	{
		return array(
			// captcha action renders the CAPTCHA image displayed on the contact page
			'captcha'=>array(
				'class'=>'CCaptchaAction',
				'backColor'=>0xFFFFFF,
			),
			// page action renders "static" pages stored under 'protected/views/site/pages'
			// They can be accessed via: index.php?r=site/page&view=FileName
			'page'=>array(
				'class'=>'CViewAction',
			),
		);
	}
	
	public function actionPage()
	{
		if(isset($_GET['id']))
            $id=$_GET['id'];
		/*$user = User::model()->findByPk(1);
		$user2 = $user->attributes;
		unset($user2['password']);*/
		echo CJSON::encode(array('id'=>$id, 'content'=>$this->renderPartial($id, $dataArray, true)));
		//echo CJSON::encode(array('id'=>$id, 'content'=>"Content ".$user2));
	}
	
	public function actionList()
	{
		if(isset($_GET['id']))
            $id=$_GET['id'];
		$posts = Post::model()->findAllByAttributes(array("author"=>1));
		$posts2 = array();
		$i = 0;
		foreach($posts as $p) {
			//$author = User::model()->findByPk($p['author']);
			//$p['attributes']['authorName'] = $author['name'];
			$posts2[$i] = (array)$p['attributes'];
			$posts2[$i]['authorName'] = $p->author0->name;
			$i++;
			//$p['attributes']['author'] = $author['id'];
			//var_dump($posts2);
			//var_dump((array)$p['attributes']);
			//var_dump($i);
		}
		//die(var_dump($posts));
		echo CJSON::encode($posts2);
	}
	
	public function actionUser()
	{
		if(isset($_GET['id'])) {
            $id=$_GET['id'];
			$user = User::model()->findByPk($id);
			$post = Post::model()->findAllByAttributes(array("author"=>$id));
			$posts = count($post);
			$user = (array)$user['attributes'];
			$user['posts'] = $posts;
			$user['stars'] = 0;
			$user['likes'] = 0;
			//var_dump($user);
			echo CJSON::encode($user);
		}
	}
	
	public function actionCreate()
	{
		
		//$data = (array)json_decode( file_get_contents('php://input') );
		//echo (var_dump($data));
		$model = new Post();
		$model->setAttributes($this->getJsonInput());
		//$model->setAttributes($data);
		if (!$model->validate()) {
			$this->sendResponse(400, CHtml::errorSummary($model));
		} else if (!$model->save(false)) {
			throw new CException('Cannot create a record');
		}
		$model->refresh();
		echo CJSON::encode($model);
		/*
		if(isset($_GET['id']))
            $id=$_GET['id'];
		$posts = Post::model()->findAllByAttributes(array("author"=>1));
		foreach($posts as $p) {
			$author = User::model()->findByPk($p['author']);
			$p['author'] = $author['name'];
		}
		echo CJSON::encode($posts);*/
	}
	
	public function actionDelete($id)
	{
		if (null === ($model = Post::model()->findByPk($id)))
			throw new CHttpException(404);
		if (!$model->delete())
			throw new CException('Cannot delete event');
		die("Deleted post id: ".$id);
	}


	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionError()
	{
		if($error=Yii::app()->errorHandler->error)
		{
			if(Yii::app()->request->isAjaxRequest)
				echo $error['message'];
			else
				$this->render('error', $error);
		}
	}

	/**
	 * Displays the contact page
	 */
	public function actionContact()
	{
		$model=new ContactForm;
		if(isset($_POST['ContactForm']))
		{
			$model->attributes=$_POST['ContactForm'];
			if($model->validate())
			{
				$name='=?UTF-8?B?'.base64_encode($model->name).'?=';
				$subject='=?UTF-8?B?'.base64_encode($model->subject).'?=';
				$headers="From: $name <{$model->email}>\r\n".
					"Reply-To: {$model->email}\r\n".
					"MIME-Version: 1.0\r\n".
					"Content-Type: text/plain; charset=UTF-8";

				mail(Yii::app()->params['adminEmail'],$subject,$model->body,$headers);
				Yii::app()->user->setFlash('contact','Thank you for contacting us. We will respond to you as soon as possible.');
				$this->refresh();
			}
		}
		$this->render('contact',array('model'=>$model));
	}

	/**
	 * Displays the login page
	 */
	public function actionLogin()
	{
		$model=new LoginForm;

		// if it is ajax validation request
		if(isset($_POST['ajax']) && $_POST['ajax']==='login-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}

		// collect user input data
		if(isset($_POST['LoginForm']))
		{
			$model->attributes=$_POST['LoginForm'];
			// validate user input and redirect to the previous page if valid
			if($model->validate() && $model->login())
				$this->redirect(Yii::app()->user->returnUrl);
		}
		// display the login form
		$this->render('login',array('model'=>$model));
	}

	/**
	 * Logs out the current user and redirect to homepage.
	 */
	public function actionLogout()
	{
		Yii::app()->user->logout();
		$this->redirect(Yii::app()->homeUrl);
	}
}