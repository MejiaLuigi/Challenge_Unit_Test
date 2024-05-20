//__DIRNAME acceder a la ruta principal de nuestro proyecto

let x = [1, 2, 3];
//operador de propaacion spredd operTOR
x.push(...[4,5]);
console.log(x);

//ELIMINAR ELENTOS DE ARRAY

const emojis = ['❤️','😉', '🏌️']
const lastemoji = emojis.pop();

console.log(lastemoji);
console.log(emojis)

//agrear elemento a el final de un array

const emojisDOS = ['❤️','😉', '🏌️']
    emojis.push('😘')

console.log(emojis)
 //find
 //consultar otros
 const emojiTTres = ['👍', '😁', '✌️']
 // devover sonrreir 
 const sonreir = emojiTTres.find(emojitt => {
    return emojitt=== '😁'
 })
 console.log("nos reotrna sonrreir jeje",sonreir)


 //mapea .map
 const emoiMap = ['💙','💚','💛']

 const result = emoiMap.map(emojimapeado => {
    return emojimapeado + emojimapeado
 });


 const emojisforeach = ['🤡','🥳','👻']

 emojisforeach.forEach(emojisforeach =>{
    console.table(`in love ${emojisforeach}` )
 })


 // el response es todoso las datos que yo le envio a el cliente y el req es todos los datos que el cliente me esta enviandoo00.