class Jsedis{
	constructor(){
		this.store={};
		this.channels={};
	}
	append(key,value){
		if(['string','number'].includes(typeof(value))){
			this.store.key="";
			this.store.key+=value;
			return value.length;
		}
		console.error(`Type ${typeof(value)} not supported for append`)
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
}

var j=new Jsedis();
j.append('varun','sadas');
j.append('varun',{});