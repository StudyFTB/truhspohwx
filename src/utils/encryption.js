/* 加密方法的js
	*需要两个参数：Timestamp,KEY  加密方式：SHA1+MD5
	* Timestamp格式：ssTT（秒+毫秒）
	* KEY格式：URL+'TRUDC'+GUID+Timestamp组成字符串后先SHA1,再MD5;
	* GUID指定为 295470F1-73CD-43EE-5643-5F70A2874B1E
*/
import SHA1 from 'js-sha1';
import MD5 from 'js-md5';

function getTimestamp(){
	let nowTime=new Date();
	let Timestamp=nowTime.getSeconds().toString()+nowTime.getMilliseconds().toString();
	return Timestamp;
}

export default (URL) => {
    const GUID = '295470F1-73CD-43EE-5643-5F70A2874B1E';
	let Timestamp = getTimestamp();
	let KEY = URL + 'TRUDC' + GUID + Timestamp;
	KEY=SHA1(KEY);
	KEY=MD5(KEY);
	let res={
		'Timestamp':Timestamp,
		'KEY':KEY
	}
	return res;
}