function carregar(){

var msg = document.getElementById('msg')
var img = document.getElementById('imagem')
var data = new Date()
var hora = data.getHours().toString().padStart(2, '0');
var minuto = data.getMinutes().toString().padStart(2, '0')
var segundos= data.getSeconds().toString().padStart(2, '0')
msg.innerHTML=`Agora são ${hora}:${minuto}:${segundos} horas.`

if(hora >= 0 && hora < 12){
    
img.src = 'fotomanha.jpg'
   document.body.style.background='#e2cd9f'


} else if(hora >= 12 && hora < 18){

    img.src='fototarde.jpg'
    document.body.style.background='#b9846f'

} else {
    
   img.src='fotonoite.jpg'
     document.body.style.background='#515154'

}

}
setInterval (carregar,1000)
