const BASE                  =10;
const SYM_PER_DIGIT         =((BASE-1)+"").length;
const DIGITS_ARRAY_MAXLEN   =13;
const DIGITS_ARRAY          =new Array(DIGITS_ARRAY_MAXLEN).fill(0);


class TBuffer{ // методы класса
    constructor(...x){ // инициализация объекта, constructor запускается с заданным аргументом в ()и сохраняет его в this.valData 
        this.valData=x.reduce(function(prev,cur) {return prev+cur});  // reduce= метод, приводит массив к единому значению(переборка значений массива)
        this.base=BASE; 
        return this; // возвращает все значения
    }
     
    shr(){this.valData=Math.floor(this.valData/this.base)} // выделение целой части
     
    rem(){
            var r=this.valData%this.base;
            this.shr();
            return r;
     } //возвращает остаток от деления
        isZerro(){
            return this.valData===0;
     } //  возвращает указание на valData, оператор "===" проверяет величину на идентичность(строгое определение совпадения)
        notEmpty(){
            return !this.isZerro();
     } //  возврвщает результат метода isZerro() 
        pushSum(...x){return this.valData+=x.reduce((prev,cur)=>prev+cur,0)} //метод добавления суммы с параметром (...х), ссылаясь на переменную valData, "+=" добавляет значение x.reduce() к перменной и присваивает переменной результат
        pushProd(...x){return this.valData+=x.reduce((prev,cur)=>prev*cur,1)} 
        pushDid(...x){return this.valData+=x.reduce((prev,cur)=>prev-cur,0)}
}

class TLNum {
    constructor(S) {
        S=S || {};
        this._digits=S['digits'] || [0,0,0,0,0,0,0,0,0,0,0,0,0]; //[7,5,0,5,4,0,0,0,0,0]
        this.maxlen=S['digits'] ? S['digits'].length : DIGITS_ARRAY_MAXLEN; // "?" оператор значения if,если в конструкторе S[]
        this.negative=S['n'] || false;
        this.layout=S['layout'] || null;
        this.ref=0;
        this._current=0;
        this.lsd_num=0;
        this.find_lsd();
        return this;
    }
     
    first(){this._current=0;return this.current()};
    last(){this._current=this.lsd_num;return this.current()};
    next(){this._current+=1;return this.current()};
    prev(){this._current-=1;return this.current()};
    //console.assert(this.current>=0,"Current digit reference is negative")
    // return this.current();

    digits(d){
        if(d==undefined){return(this._digits)}
        this._digits.fill(d);return this;
    }
    lsd(n){
        if (n!=undefined){this.lsd_num=n;return this}
        else {return this._digits[this.lsd_num]}
    }

    find_lsd(){
        for(let i=0;i<this._digits.length;i++){
            if(this._digits[i]!==0) 
                this.lsd_num=i
        }
    }
    current_lsd(){
      return this._current==this.lsd_num  
    }
    
    current(new_val){
        if(new_val==undefined){return this._digits[this._current]}
        else {
            if(this._current==this.maxlen){return false;}
            this._digits[this._current]=new_val;
            return this
        }
    }
    str(){
        
        return "число"
    }
    setRand(){
        return "случайный"
    }
    add(s){
        let bf=new TBuffer(this.first(),s.first())
        while (bf.notEmpty()&& (!this.current_lsd() || !s.current_lsd()) ) {
            this.current(bf.rem())
            this.next();
            s.next()
            this.current(bf.pushSum(this.current(),s.current()))
            this.find_lsd();
        }
    }

    compare(s){
        this._current=this.lsd_num
        s._current=s.lsd_num
        if(this._current>s._current){return 1}
        else if(this._current<s._current){return -1}
        else {
            while (this._current!==0){
                if (this.current() > s.current()){return 1}
                else if(this.current() < s.current()) {return -1}
                else {
                    this.prev(); s.prev();
                }
            }
            if (this.current() > s.current()){return 1}
            else if(this.current() < s.current()) {return -1}
            else return 0
        }
    }

    // A.fff(B)
    
    isGreater(s) {
        return this.compare(s) === 1 
    }

    isLess(s) {
        return this.compare(s) === -1
    }

    isEqual(s) {
        return this.compare(s) === 0
    }

    subtract(s) {
        let bf
        if(this.isLess(s)) {
            bf = new TBuffer(s.first(), this.first())
        }
        else if (this.isEqual(s)) {
            return 0
        }            
        else {
            bf = new TBuffer(this.first(), s.first())
        }
    }
   
}
  

