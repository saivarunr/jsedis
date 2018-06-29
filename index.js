class Jsedis{
	constructor(){
		this.store={};
	}
	append(key,value){
		if(['string','number'].includes(typeof(value))){
			this.store.key="";
			this.store.key+=value;
			return value.length;
		}
		console.error(`Type ${typeof(value)} not supported for append`)
	}
}

var j=new Jsedis();
j.append('varun','sadas');
j.append('varun',{});