<?php
/**
 * This is the model class for table "user".
 */
class User extends CActiveRecord
{
	public function tableName()
	{
		return 'users';
	}
	public function rules()
	{
		return array(
			array('login, password', 'required'),
			array('name, login, password, email', 'length', 'max'=>32)
		);
	}
	public function toJSON()
	{
		$attributes = parent::toJSON();
		unset($attributes['password']);
		return $attributes;
	}
	public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }
}