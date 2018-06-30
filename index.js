class JString{
	constructor(){
		this.key="";
	}
	static isInstance(object){
		return object.constructor==JString.constructor;
	}
	append(value){
		if(!['string','number'].includes(typeof(value))){
			console.error(`Unsupported type ${typeof(value)} for append action`);
			return false;
		}
		this.key+=value;
		return this.key.length;
	}
}
class JHash{
	constructor(){
		this.key={};
	}
	hset(field,value){
		this.key[field]=value;
	}
	hmset(...args){
		let fieldValues=[...args];
		if(fieldValues.length==0||fieldValues.length%2==1){
			console.error('ERR wrong number of arguments for HMSET');
			return false;
		}
		for(let i=0;i<fieldValues.length/2;i++){
			this.key[fieldValues[i]]=fieldValues[i+1];
		}
	}
}
class Jsedis{

	constructor(){
		this.store={};
		this.channels={};
	}
	append(key,value){
		if(!this.store.hasOwnProperty(key)){
			this.store[key]=new JString();
		}
		if(JString.isInstance(this.store[key])){
			console.error(`WRONGTYPE Operation against a key holding the wrong kind of value`);
			return false;
		}
		return this.store[key].append(value);
	}
	subscribe(channel,callback){
		if(typeof(callback)!="function"){
			console.error(`Callbacks for channel should be a function, not ${typeof(callback)}`);
			return false;
		}
		if(!this.channels.hasOwnProperty(channel)){
			this.channels[channel]=new Array();
		}
		this.channels[channel].push(callback);
		return true;
	}
	publish(channel,message){
		if(!this.channels.hasOwnProperty(channel)){
			return false;
		}
		this.channels[channel].forEach(function(callBackFunc){
			callBackFunc(message);
		});
		return true;
	}
	exists(key){
		return this.store.hasOwnProperty(key);
	}
}

var j=new Jsedis();
j.append('varun','sadas');
j.append('varun',{});