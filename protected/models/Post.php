<?php
/**
 * This is the model class for table "user".
 */
class Post extends CActiveRecord
{
	public function tableName()
	{
		return 'posts';
	}
	public function rules()
	{
		return array(
			array('id, content', 'author', 'required')
		);
	}
	public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }
}