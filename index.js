const {VK} = require('vk-io');
const { HearManager } = require('@vk-io/hear'); 
const { createCanvas, loadImage} = require('canvas')
const {Keyboard} = require('vk-io');
const vk = new VK({
    token: "", // токен группы
    apiMode: "parallel", 
    pollingGroupId:  // ID группы
}); 
	
const { updates } = vk;
const fs = require('fs');
const chalk = require('chalk');
const chats = require('./chats.json')
const req = require('request');
const request = require('request-promise')
const managerid = ; // ID группы


/*=========================================================================================*/

const hearManager = new HearManager();

vk.updates.on('message_new', hearManager.middleware);
/*=========================================================================================*/

setInterval(function(){ 
        fs.writeFileSync("./chats.json", JSON.stringify(chats, null, "\t")) 
}, 10000);

/*=========================================================================================*/
const utils = { 
sp: (int) => { 
int = int.toString(); 
return int.split('').reverse().join('').match(/[0-9]{1,3}/g).join(',').split('').reverse().join(''); 
}, 
rn: (int, fixed) => { 
if (int === null) return null; 
if (int === 0) return '0'; 
fixed = (!fixed || fixed < 0) ? 0 : fixed; 
let b = (int).toPrecision(2).split('e'), 
k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), 
c = k < 1 ? int.toFixed(0 + fixed) : (int / Math.pow(10, k * 3) ).toFixed(1 + fixed), 
d = c < 0 ? c : Math.abs(c), 
e = d + ['', 'тыс', 'млн', 'млрд', 'трлн'][k]; 

e = e.replace(/e/g, ''); 
e = e.replace(/\+/g, ''); 
e = e.replace(/Infinity/g, 'ДОХЕРА'); 

return e; 
}, 
gi: (int) => { 
int = int.toString(); 

let text = ``; 
for (let i = 0; i < int.length; i++) 
{ 
text += `${int[i]}⃣`; 
} 

return text; 
}, 
decl: (n, titles) => { return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2] }, 
random: (x, y) => { 
return y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x); 
}, 
pick: (array) => { 
return array[utils.random(array.length - 1)]; 
} 
}

function getRandomInRange(min, max) { 
return Math.floor(Math.random() * (max - min + 1)) + min; 
}; //Функция выбора рандомного числа

var now = new Date();
function addZero(num) { return ('0' + num).slice(-2); }

function nols(num) {
    if(num < 10) return('0' + num)
    if(num > 9) return(num)
}

function find(array, value) { 
for (var i = 0; i < array.length; i++) { 
if (array[i] == value) return i; 
} 
return -1; 
};

setInterval(() => {
let chats = require('./chats.json');
require('fs').writeFileSync('./chats.json', JSON.stringify(chats, null, '\t'));
}, 10000);

vk.updates.use(async (context, next) => {

    if(!context.isChat) return;

    if (context.text) {
        console.log(chalk.yellow(`@id${context.senderId}: chatid${ context.isChat ? "#" + context.chatId : "" }, text: ${ context.text.slice(0, 360) }`));
    }

    if (!chats[context.chatId]) {
        
        let months = new Date().getMonth()
        let days = new Date().getDate()
        let hour = new Date().getHours()
        let minute = new Date().getMinutes()
        let second = new Date().getSeconds()

        chats[context.chatId] = {
            reg: `${nols(days)}.${nols(months)}.${new Date().getFullYear()}, ${nols(hour)}:${nols(minute)}:${nols(second)}`,
            ownerid: 0,
            rules: 0,
            maxwarns: 3,
            jointext: 0,
            pinmes: 0,
            botname: "!",
            users: {},
            chatname: 0,
            msg: 0
        }
    }
    if(context.senderId < 0){
        if (!chats[context.chatId].users[context.senderId]) {
            const [user_info] = await vk.api.groups.getById({ group_id: Math.abs(context.senderId) });
            chats[context.chatId].users[context.senderId] = {
                rank: 0,
                warns: 0,
                autokick: 0,
                vkid: context.senderId,
                banned: 0,
                name: `${user_info.name}`,
                muted: 0,
                msg: 0
            }
        }
    }
    if (!chats[context.chatId].users[context.senderId]) 
    {
        const [user_info] = await vk.api.users.get({ user_ids: context.senderId });
        console.log(context.senderId)
        if(context.senderId == 446119308)
        {
            chats[context.chatId].users[context.senderId] = {
                rank: 9,
                warns: 0,
                autokick: 0,
                vkid: context.senderId,
                banned: 0,
                name: `${user_info.first_name}`,
                muted: 0,
                msg: 0
            }
        }
        chats[context.chatId].users[context.senderId] = {
            rank: 0,
            warns: 0,
            autokick: 0,
            vkid: context.senderId,
            banned: 0,
            name: `${user_info.first_name}`,
            muted: 0,
            msg: 0
        }
    }
    if(chats[context.chatId].users[context.senderId].muted > 0) 
    {
        const [user_info] = await vk.api.users.get({ user_ids: context.senderId}); 

        let b = user_info.id

        context.reply(`*id${user_info.id} (${user_info.first_name} ${user_info.last_name}) написал сообщение при муте и исключается из беседы.`)

        vk.api.messages.removeChatUser({ chat_id: context.chatId, member_id: b}); 
    }

    if (context.text) 
    {
    	chats[context.chatId].msg += Number(1)

    	chats[context.chatId].users[context.senderId].msg += Number(1)
    }

    context.user = chats[context.chatId];
    ctx = context;

    try {
        await next();
    } 

    catch (err) 
    {
        console.error(err)
    }

    require('fs').writeFileSync('./chats.json', JSON.stringify(chats, null, '\t'));

});


/*=========================================================================================*/

vk.updates.use(async (message, next) => {
    if (message.isOutbox) {
        return;
    }
    await next(); 
});
/*======================================Команды бота=======================================*/

vk.updates.on(['chat_invite_user'], async (context) => {

    console.log(context.payload)

    var proverka = `${context.eventMemberId}`

    var g = -managerid

    console.log(context.payload.message.from_id)

    var aa = `${context.payload.message.from_id}`

    console.log(g)

    if(proverka.includes(g)) {
        return context.reply(`Всем привет, я чат-бот для управления беседой! 🔱\nЯ не являюсь администратором, прошу выдать администратора.\nА после, написать команду "${chats[context.chatId].botname}обновить"`)
    }
    if(chats[context.chatId].users[aa].rank < 8){
        context.reply(`Вашего статуса недостаточно для приглашения участников в чат.`)
        vk.api.messages.removeChatUser({ chat_id: context.chatId, member_id: aa })
        vk.api.messages.removeChatUser({ chat_id: context.chatId, member_id: proverka })
    }
    if(chats[context.chatId].jointext !== 0) {
    	if (proverka.includes("-")) {
    		aye = proverka.replace("-", "")
    		const [user_info] = await vk.api.groups.getById({ group_id: aye}); 
    		return context.reply(`*club${aye} (${user_info.name}), ${chats[context.chatId].jointext}`);
    	}
        context.reply(`*id${proverka} (${chats[context.chatId].users[proverka].name}), ${chats[context.chatId].jointext}`)
    }
    if(chats[context.chatId].users[proverka].autokick > 0) {
        context.reply(`Этот участник находится в бане.
        ${chats[context.chatId].botname}бан- ${proverka} для снятия бана.`)
        vk.api.messages.removeChatUser({ chat_id: context.chatId, member_id: proverka}); 
    }

})

vk.updates.on(['chat_invite_user_by_link'], async (context) => {

    console.log(context.payload)

    let proverka = `${context.payload.message.from_id}`

    let g = -managerid

    console.log(g)

    if(proverka.includes(g)) 
    {
        return context.reply(`Я не являюсь администратором данной беседы, из-за чего не могу работать в чате. 
        После того как всё сделаете, обновите чат командой:
        "обновить"`)
    }
    if(chats[context.chatId].jointext !== 0) {
        const [user_info] = await vk.api.users.get({ user_ids: proverka}); 
        let b = user_info.id
        context.reply(`*id${proverka} (${user_info.first_name} ${user_info.last_name}), ${chats[context.chatId].jointext}`)
    }

    if(chats[context.chatId].users[proverka].autokick > 0) {
        const [user_info] = await vk.api.users.get({ user_ids: proverka}); 
        let b = user_info.id
        context.reply(`Этот участник находится в бане.
        ${chats[context.chatId].botname}бан- ${user_info.id} для снятия бана.`)
        vk.api.messages.removeChatUser({ chat_id: context.chatId, member_id: b}); 
    }

})

vk.updates.on(['chat_photo_update'], async (context) => {

    console.log(context.payload)

    let a = `${context.payload.message.from_id}`

    let g = -managerid

    let warns = chats[context.chatId].users[a].warns

    if(chats[context.chatId].users[a].rank < 8)
    {
        context.reply("Вашего статуса недостаточно для обновления фотографии чата.\nПолучено предупреждение.")
        vk.api.messages.deleteChatPhoto({ chat_id: context.chatId })
        try {
            chats[context.chatId].users[a].warns += Number(1)
            if(chats[context.chatId].users[a].warns == chats[context.chatId].maxwarns) {
                warns = chats[context.chatId].users[a].warns
            	chats[context.chatId].users[a].warns = 0;
            	chats[context.chatId].users[a].banned = 50;
            	chats[context.chatId].users[a].autokick = 1
                vk.api.messages.removeChatUser({ chat_id: context.chatId, member_id: a })
                .catch((error) => {return context.reply(`⚠ Не удалось исключить пользователя из беседы.\nВК ответил: ${error}`);
                });

            	return context.reply(`Участник получил максимальное предупреждение (${warns}/${chats[context.chatId].maxwarns}) и блокируется в беседе.`);
            	
            }
        } 
            catch (e)
            {
                return context.reply(`${e} error`)
            } 
    }

})

vk.updates.on(['chat_photo_remove'], async (context) => {

    console.log(context.payload)

    let a = `${context.payload.message.from_id}`

    let g = -managerid

    let warns = chats[context.chatId].users[a].warns

    if(chats[context.chatId].users[a].rank < 8){
        context.reply("Вашего статуса недостаточно для удаления фотографии чата.\nПолучено предупреждение.")
        try {
            chats[context.chatId].users[a].warns += Number(1)
            if(chats[context.chatId].users[a].warns == chats[context.chatId].maxwarns) {
                warns = chats[context.chatId].users[a].warns
            	chats[context.chatId].users[a].warns = 0;
            	chats[context.chatId].users[a].banned = 50;
            	chats[context.chatId].users[a].autokick = 1
                vk.api.messages.removeChatUser({ chat_id: context.chatId, member_id: a })
                .catch((error) => {return context.reply(`⚠ Не удалось исключить пользователя из беседы.\nВК ответил: ${error}`);
            	});
        		return context.reply(`Участник получил максимальное предупреждение (${warns}/${chats[context.chatId].maxwarns}) и блокируется в беседе.`);
        	}
        } 
        catch (e)
        {
            return context.reply(`${e} error`)
        } 
    }

})


vk.updates.on(['chat_title_update'], async (context) => {

    console.log(context.payload)

    let a = `${context.payload.message.from_id}`

    let g = -managerid

    if(context.senderId == chats[context.chatId].ownerid){
        chats[context.chatId].chatname = `${context.payload.message.action.text}`
    }

    let users = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 

    let admin = users.items.find((item) => item.member_id === context.senderId);

    if (admin.is_admin){
        chats[context.chatId].chatname = `${context.payload.message.action.text}`
    }

    let warns = chats[context.chatId].users[a].warns

    if(chats[context.chatId].users[a].rank < 8){
        context.reply("Вашего статуса недостаточно для изменения названия чата.\nПолучено предупреждение.")
        vk.api.messages.editChat({ chat_id: context.chatId, title: chats[context.chatId].chatname })
        try {
            chats[context.chatId].users[a].warns += Number(1)
            if(chats[context.chatId].users[a].warns == chats[context.chatId].maxwarns) {
                warns = chats[context.chatId].users[a].warns
            	chats[context.chatId].users[a].warns = 0;
            	chats[context.chatId].users[a].banned = 50;
            	chats[context.chatId].users[a].autokick = 1
                vk.api.messages.removeChatUser({ chat_id: context.chatId, member_id: a })
                .catch((error) => {return context.reply(`⚠ Не удалось исключить пользователя из беседы.\nВК ответил: ${error}`);
            	});
        		return context.reply(`*id${a} (Участник) получил максимальное предупреждение (${warns}/${chats[context.chatId].maxwarns}) и блокируется в беседе.`);
        	}
        }
        catch (e)
        {
            return context.reply(`${e} error`)
        } 
    }

})

vk.updates.on(['chat_pin_message'], async (context) => {

    console.log(context.payload)

    let a = `${context.payload.message.from_id}`

    let g = -managerid

    let warns = chats[context.chatId].users[a].warns

    if(chats[context.chatId].users[a].rank >= 8){
        let h = context.id
        chats[context.chatId].pinmes = h
    }

    if(chats[context.chatId].users[a].rank < 8){
        context.reply("Вашего статуса недостаточно для закрепления сообщения чата.\nПолучено предупреждение.")
        if(chats[context.chatId].pinmes == 0){
            vk.api.messages.unpin({ peer_id: context.peerId })
        }

        vk.api.messages.pin({ peer_id: context.peerId, message_id: chats[context.chatId].pinmes })
        try {
            chats[context.chatId].users[a].warns += Number(1)
            if(chats[context.chatId].users[a].warns == chats[context.chatId].maxwarns) {
                warns = chats[context.chatId].users[a].warns
                chats[context.chatId].users[a].warns = 0;
                chats[context.chatId].users[a].banned = 50;
                chats[context.chatId].users[a].autokick = 1
                vk.api.messages.removeChatUser({ chat_id: context.chatId, member_id: a })
                .catch((error) => {return context.reply(`⚠ Не удалось исключить пользователя из беседы.\nВК ответил: ${error}`);
            });
    		return context.reply(`Участник получил максимальное предупреждение (${warns}/${chats[context.chatId].maxwarns}) и блокируется в беседе.`);
            }
        } 
        catch (e)
        {
            return context.reply(`${e} error`)
        } 
    }

})

vk.updates.on(['chat_unpin_message'], async (context) => {

    console.log(context.payload)

    let a = `${context.payload.message.from_id}`

    let g = -managerid

    let warns = chats[context.chatId].users[a].warns

    if(chats[context.chatId].users[a].rank < 8) 
    {
        context.reply("Вашего статуса недостаточно для открепления сообщения чата.\nПолучено предупреждение.")
        if(!chats[context.chatId].pinmes == 0)
        {
            vk.api.messages.pin({ peer_id: context.peerId, message_id: chats[context.chatId].pinmes })
        }
            
        try {
            chats[context.chatId].users[a].warns += Number(1)
            if(chats[context.chatId].users[a].warns == chats[context.chatId].maxwarns) {
                warns = chats[context.chatId].users[a].warns
            	chats[context.chatId].users[a].warns = 0;
            	chats[context.chatId].users[a].banned = 50;
            	chats[context.chatId].users[a].autokick = 1
                vk.api.messages.removeChatUser({ chat_id: context.chatId, member_id: a })
                .catch((error) => {return context.reply(`⚠ Не удалось исключить пользователя из беседы.\nВК ответил: ${error}`);
            	});
            		return context.reply(`*id${a} (Участник) получил максимальное предупреждение (${warns}/${chats[context.chatId].maxwarns}) и блокируется в беседе.`);
            }
        } 
        catch (e)
        {
            return context.reply(`${e} error`)
        }
    }

})

hearManager.hear(/([^]+)выбери ([^]+) или ([^]+)/i, async (context) => {
if(context.$match[1] !== chats[context.chatId].botname) return;
    let random = rand([1,2,3,4,5])
    let one = context.$match[2]
    let two = context.$match[3]
    let smiles = rand([`🍏`,`🌚`,`🌿`,`🍃`,`✨`,`💭`,`💬`,`⚕`,`💨`,`🐤`,`🍀`,`🐼`,`🥚`,`🎯`])
    if(random == 1) return context.reply(` ` + one + ` лучше чем ` + two + ` ` + smiles + ` `);
    if(random == 2) return context.reply(` я выбираю ` + two + ` ` + smiles + ` `)
    if(random == 3) return context.reply(` ` + two + ` звучит круче ` + smiles + ` `)
    if(random == 4) return context.reply(` ` + two + ` лучше чем ` + one + ` ` + smiles + ` `)
    if(random == 5) return context.reply(` я выбираю ` + one + ` ` + smiles + ` `)
});

hearManager.hear(/([^]+)инфо ([^]+)/i, async (context) => {
if(context.$match[1] !== chats[context.chatId].botname) return;
    let phrases = rand(['Вероятно, это', 'Это примерно ', 'Вероятность составляет '])
    let b = getRandomInRange(1, 100)
	const canvas = createCanvas(1920, 1080);
	const ctx = canvas.getContext('2d');
	
	ctx.font = '50px Helvitica';
	ctx.textAlign = 'center';
	return context.reply(`${phrases} ${b}%`);
	
	fs.writeFileSync('out.png', canvas.toBuffer());
	return context.replyPhoto(canvas.toBuffer());

});

hearManager.hear(/^(?:([^]+)гиф|gif)\s(.*)$/i, async (context, bot) => {
if(context.$match[1] !== chats[context.chatId].botname) return;
let acces = 0
    let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
    let c = b.items.find((item) => item.member_id === context.senderId);
    if(c.is_owner) acces = 1
    if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1
    if(acces < 1) return context.reply(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
	vk.api.call('docs.search', {q: context.$match[1] + '.gif', count: 10}) 
	.then(response => { 
		let items = response.items.map(x => `doc${x.owner_id}_${x.id}`).join(','); 
		return context.reply(`по вашему запросу [${context.$match[1]}], я нашлел следующие GIF Материалы:`, {attachment: items}) 
	}) 
});

hearManager.hear(/^(?:([^]+)clear)/i, async (context) => { 
    if(context.$match[1] !== chats[context.chatId].botname) return;
    let acces = 0
    let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
    let c = b.items.find((item) => item.member_id === context.senderId);
    if(c.is_owner) acces = 1
    if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1
    if(acces < 1) return context.reply(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
 	context.reply("&#4448;\n".repeat(250) + `😍❤ | Я очистил чат от лишних сообщений! | 😍❤`);
 	context.reply({sticker_id:11246})
 });

hearManager.hear(/^(?:([^]+)Стикер)\s?([0-9]+)?/i,  context => {
    if(context.$match[1] !== chats[context.chatId].botname) return;
	if(!context.$match[1]) return context.reply(`Укажите ID Стикера`);  
	context.reply({
		sticker_id: context.$match[1]}).catch((error) => {return context.reply(`😢 к сожалению, владелец бота не купил мне ещё пак в котором будет стикер №${context.$match[1]}`)});
});

hearManager.hear(/^(?:([^]+)qr)\s(.*)/i, async (context) => {
    if(context.$match[1] !== chats[context.chatId].botname) return;
	const qr = require('qr-image');
	let qr_svg = qr.image(context.$match[1], { type: 'png' });
	qr_svg.pipe(require('fs').createWriteStream('qr.png'));
	var svg_string = qr.imageSync(context.$match[1], { type: 'png' });
	context.replyPhoto(svg_string)
});

hearManager.hear(/([^]+)инфа ([^]+)/i, async (context) => {
    if(context.$match[1] !== chats[context.chatId].botname) return;
    let phrases = rand(['Вероятно, это', 'Это примерно ', 'Вероятность составляет '])
    let b = getRandomInRange(1, 100)
	const canvas = createCanvas(1920, 1080);
	const ctx = canvas.getContext('2d');
	
	ctx.font = '50px Helvitica';
	ctx.textAlign = 'center';
	return context.reply(`${phrases} ${b}%`);
	
	fs.writeFileSync('out.png', canvas.toBuffer());
	return context.replyPhoto(canvas.toBuffer());

});

hearManager.hear(/([^]+)кто ([^]+)/i, async (context) => {
    if(context.$match[1] !== chats[context.chatId].botname) return;
    let phrases = rand(['Боже ж ты мой, о', 'Вполне вероятно, ', 'Вполне вероятно, ', 'Скорее всего, ', 'Открою страшную тайну,', 'Ай молодца,'])
    let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId, fields: "users"}); 
    b = rand(b.items)
    var g = `${b.member_id}`
    if(g.includes("-")){
        const [user_info] = await vk.api.groups.getById({ group_id: g}); 
	
	const canvas = createCanvas(1920, 1080);
	const ctx = canvas.getContext('2d');
	
	//ctx.font = '50px Helvitica';
	//ctx.textAlign = 'center';
	return context.reply(` ${phrases} ${context.$match[2]} — ${user_info.name}`);
    }

    const [user_info] = await vk.api.users.get({ user_ids: g}); 
	
	const canvas = createCanvas(1920, 1080);
	const ctx = canvas.getContext('2d');
	
	//ctx.font = '50px Helvitica';
	//ctx.textAlign = 'center';
	context.reply(` ${phrases} ${context.$match[2]} — ${user_info.first_name} ${user_info.last_name}`);
	
	//fs.writeFileSync('out.png', canvas.toBuffer());
	//return context.replyPhoto(canvas.toBuffer());

});

hearManager.hear(/([^]+)у кого ([^]+)/i, async (context) => {
    if(context.$match[1] !== chats[context.chatId].botname) return;
    if(context.$match[2] == `мама шлюха`) return context.reply('у тебя');
    if(context.$match[2] == `матерь шлюха`) return context.reply('у тебя');
    let phrases = rand(['Боже ж ты мой, о', 'Вполне вероятно, ', 'Вполне вероятно, ', 'Скорее всего, ', 'Открою страшную тайну,', 'Ай молодца,'])
    let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId, fields: "users"}); 
    b = rand(b.items)
    var g = `${b.member_id}`
    if(g.includes("-")){
        const [user_info] = await vk.api.groups.getById({ group_id: g}); 
	
	const canvas = createCanvas(1920, 1080);
	const ctx = canvas.getContext('2d');
	
	//ctx.font = '50px Helvitica';
	//ctx.textAlign = 'center';
	return context.reply(` ${phrases} ${context.$match[2]} — ${user_info.name}`);
    }
    
    const [user_info] = await vk.api.users.get({ user_ids: g}); 
	
	//const canvas = createCanvas(1920, 1080);
	//const ctx = canvas.getContext('2d');
	
	//ctx.font = '50px Helvitica';
//	ctx.textAlign = 'center';
	context.reply(` ${phrases}\n ${context.$match[2]} — \n ${user_info.first_name} ${user_info.last_name}`);
	
	//fs.writeFileSync('out.png', canvas.toBuffer());
//	return context.replyPhoto(canvas.toBuffer());

});



hearManager.hear(/([^]+)удалить правила/i, async (context) => {

    if(context.$match[1] !== chats[context.chatId].botname) return;

    let acces = 0

    let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 

    let c = b.items.find((item) => item.member_id === context.senderId);

    if(c.is_owner) acces = 1

    if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1

    if(acces < 1) return context.reply(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 

    chats[context.chatId].rules = 0

    return context.reply(`Правила очищены.`)

    try
    {

    }

    catch (e)
    {
        return context.reply(`${e} error`)
    } 

})

hearManager.hear(/([^]+)удалить приветствие/i, async (context) => {

    if(context.$match[1] !== chats[context.chatId].botname) return;

    let acces = 0

    let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 

    let c = b.items.find((item) => item.member_id === context.senderId);

    if(c.is_owner) acces = 1

    if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1

    if(acces < 1) return context.reply(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 

    chats[context.chatId].jointext = 0

    return context.reply(`Приветствие очищено.`)

    try
    { 
    }         
    catch (e)
    {
        return context.reply(`${e} error`)
    } 

})

hearManager.hear(/([^]+)новое приветствие ([^]+)/i, async (context) => {

    if(context.$match[1] !== chats[context.chatId].botname) return;

    let acces = 0

    let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 

    let c = b.items.find((item) => item.member_id === context.senderId);

    if(c.is_owner) acces = 1

    if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1

    if(acces < 1) return context.reply(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 

    chats[context.chatId].jointext = context.$match[2]

    return context.reply(`Новое приветствие установлено.`)

    try
    { 

    }         
    catch (e)
    {
        return context.reply(`${e} error`)
    } 

})

hearManager.hear(/([^]+)новые правила ([^]+)/i, async (context) => {

    if(context.$match[1] !== chats[context.chatId].botname) return;

    let acces = 0

    let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 

    let c = b.items.find((item) => item.member_id === context.senderId);

    if(c.is_owner) acces = 1

    if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1

    if(acces < 1) return context.reply(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 

    chats[context.chatId].rules = context.$match[2]

    return context.reply(`Новые правила установлены.`)

    try
    { 

    }         
    catch (e)
    {
        return context.reply(`${e} error`)
    } 
})

hearManager.hear(/([^]+)префикс ([^]+)/i, async (context) => {

    if(context.$match[1] !== chats[context.chatId].botname) return;

    let acces = 0

    let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 

    let c = b.items.find((item) => item.member_id === context.senderId);

    if(c.is_owner) acces = 1

    if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1

    if(acces < 1) return context.reply(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`)

    if(context.$match[2] == null){
        chats[context.chatId].botname = ""
        context.reply(`Не был указан префикс.\n Использование команды без префикса.`)
    }

    chats[context.chatId].botname = context.$match[2]

    context.reply(`Префикс установлен на ${context.$match[2]}.`)


    try
    { 

    }        
    catch (e)
    {
        return context.reply(`${e} error`)
    } 
})

hearManager.hear(/([^]+)приветствие/i, async (context) => {

    if(context.$match[1] !== chats[context.chatId].botname) return;

    if(chats[context.chatId].jointext == 0) return context.reply(`Приветствие отсутствует.
    Для создания приветствия команда <<Бот новое приветствие (ваше приветствие новых участников)>>.`)

    return context.reply(`Текст приветствия: ${chats[context.chatId].jointext}`)

})

hearManager.hear(/([^]+)правила/i, async (context) => {

    if(context.$match[1] !== chats[context.chatId].botname) return;

    if(chats[context.chatId].rules == 0) return context.reply(`Правила отсутствуют.
    Для создания правил команда "бот новые правила {ваши правила}".`)

    return context.reply(`Текст правил: ${chats[context.chatId].rules}`)

})

hearManager.hear(/([^]+)установить пред ([0-9]+)/i, async (context) => {

    if(context.$match[1] !== chats[context.chatId].botname) return;

    let acces = 0

    let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 

    let c = b.items.find((item) => item.member_id === context.senderId);

    if(c.is_owner) acces = 1

    if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1


    if(acces < 1) return context.reply(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 

    let i = context.$match[2].replace(/vk.com/ig, "") 

    let j = i.replace("/", "") 

    let p = j.replace(/https:/ig, "") 

    let u = p.replace("//", "") 

    console.log(u) 

    let text = context.$match[2]

    if(text.includes('[')) {
        u = u.replace("[", "") 
        u = u.replace("]", "") 
        u = u.split("|")
        var f = u[0];
        aa = f.replace("id", "")
    }

    try
    { 
        const [user_info] = await vk.api.users.get({ user_ids: u}); 
        if(!chats[context.chatId].users[user_info.id]) {
            chats[context.chatId].users[user_info.id] = {
                    rank: 0,
                    warns: 0,
                    name: `${user_info.first_name}`, 
                    banned: 0,
                    autokick: 0,
                    vkid: user_info.id,
                    muted: 0
                }
        }

        chats[context.chatId].maxwarns = Number(context.$match[2])

        context.reply(`Максимальное количество предупреждений установлено на ${context.$match[2]}.`)

    }         
    catch (e)
    {
        return context.reply(`${e} error`)
    } 
    })


hearManager.hear(/([^]+)ник (.*) (.*)/i, async (context) => {

    if(context.$match[1] !== chats[context.chatId].botname) return;

    let acces = 0

    let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 

    let c = b.items.find((item) => item.member_id === context.senderId);

    if(c.is_owner) acces = 1

    if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1

    if(acces < 1) return context.reply(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 

    let i = context.$match[2].replace(/vk.com/ig, "") 

    let j = i.replace("/", "") 

    let p = j.replace(/https:/ig, "") 

    let u = p.replace("//", "") 

    let text = context.$match[2]

    if(text.includes('[')) {

        u = u.replace("[", "") 

        u = u.replace("]", "") 

        u = u.split("|")

        var f = u[0];

        aa = f.replace("id", "")
    }

    try
    { 
        const [user_info] = await vk.api.users.get({ user_ids: u}); 
        if(!chats[context.chatId].users[user_info.id]) {
            chats[context.chatId].users[user_info.id] = {
                    rank: 0,
                    warns: 0,
                    name: `${user_info.first_name}`, 
                    banned: 0,
                    autokick: 0,
                    vkid: user_info.id,
                    muted: 0
                }
        }

        chats[context.chatId].users[user_info.id].name = context.$match[3]

        return context.reply(`Пользователю *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) установлен новый ник`)


    }         
    catch (e)
        {
            return context.reply(`${e} error`)
        } 
    })

hearManager.hear(/([^]+)снять пред (.*)/i, async (context) => {

    if(context.$match[1] !== chats[context.chatId].botname) return;

    let acces = 0

    let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 

    let c = b.items.find((item) => item.member_id === context.senderId);

    if(c.is_owner) acces = 1

    if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1

    if(acces < 1) return context.reply(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 

    let i = context.$match[2].replace(/vk.com/ig, "") 

    let j = i.replace("/", "") 

    let p = j.replace(/https:/ig, "") 

    let u = p.replace("//", "") 

    let text = context.$match[2]

    if(text.includes('[')) {

        u = u.replace("[", "") 
        
        u = u.replace("]", "") 
     
        u = u.split("|")

        var f = u[0];

        aa = f.replace("id", "")

     
    }

    if(text.includes('club')) {

        aab = f.replace("club", "")
        console.log(aab)


        try
        { 
            const [user_info] = await vk.api.groups.getById({ group_id: aab}); 
            if(!chats[context.chatId].users[-aab]) {
                chats[context.chatId].users[-aab] = {
                        rank: 0,
                        warns: 0,
                        name: `${user_info.name}`, 
                        banned: 0,
                        autokick: 0,
                        vkid: -aab,
                        muted: 0
                    }
            }

            if(chats[context.chatId].users[-aab].warns < 1) return context.reply(`У участника *club${aab} (${user_info.name}) отсутствуют предупреждения.`)

            chats[context.chatId].users[-aab].warns = 0

            return context.reply(`Все предупреждения *club${aab} (${user_info.name}) сняты.`)

        }         
        catch (e)
        {
            return context.reply(`${e} error`)
        } 

    }

    try
    { 
        const [user_info] = await vk.api.users.get({ user_ids: u}); 
        if(!chats[context.chatId].users[user_info.id]) {
            chats[context.chatId].users[user_info.id] = {
                    rank: 0,
                    warns: 0,
                    name: `${user_info.first_name}`, 
                    banned: 0,
                    autokick: 0,
                    vkid: user_info.id,
                    muted: 0
                }
        }

        if(chats[context.chatId].users[user_info.id].warns < 1) return context.reply(`У участника *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) отсутствуют предупреждения.`)

        chats[context.chatId].users[user_info.id].warns = 0

        return context.reply(`Все предупреждения *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) сняты.`)

    }         
    catch (e)
        {
            return context.reply(`${e} error`)
        } 
})


hearManager.hear(/([^]+)пред (.*)/i, async (context) => {
if(context.$match[1] !== chats[context.chatId].botname) return;
let acces = 0
let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let c = b.items.find((item) => item.member_id === context.senderId);
if(c.is_owner) acces = 1
if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1
if(acces < 1) return context.reply(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
let i = context.$match[2].replace(/vk.com/ig, "") 
let j = i.replace("/", "") 
let p = j.replace(/https:/ig, "") 
let u = p.replace("//", "") 
console.log(u) 
let text = context.$match[2]
if(text.includes('[')) {
    u = u.replace("[", "") 
    console.log(u)
    u = u.replace("]", "") 
    console.log(u)
    u = u.split("|")
    console.log(u)
    var f = u[0];
    console.log(f)
    aa = f.replace("id", "")
    console.log(aa)
 
 
}

if(text.includes('club')) {

    aab = f.replace("club", "")
    console.log(aab)


try{ 
const [user_info] = await vk.api.groups.getById({ group_id: aab}); 
if(!chats[context.chatId].users[-aab]) {
    chats[context.chatId].users[-aab] = {
            rank: 0,
            warns: 0,
            name: `${user_info.name}`, 
            banned: 0,
            autokick: 0,
            vkid: -aab,
            muted: 0
        }
}

chats[context.chatId].users[-aab].warns += Number(1)
if(chats[context.chatId].users[-aab].warns == chats[context.chatId].maxwarns) {
	chats[context.chatId].users[-aab].warns = 0;
	chats[context.chatId].users[-aab].banned = 50;
	chats[context.chatId].users[-aab].autokick = 1
    vk.api.messages.removeChatUser({ chat_id: context.chatId, member_id: -aab })
    .catch((error) => {return context.reply(`⚠ Не удалось исключить пользователя из беседы.\nВК ответил: ${error}`);
	});
		return context.reply(`*club${aab} (${user_info.name}) получил максимальное предупреждение (${chats[context.chatId].maxwarns}/${chats[context.chatId].maxwarns}) и блокируется в беседе.`);
	}else{
		return context.reply(`Было выдано предупреждение (${chats[context.chatId].users[-aab].warns}/${chats[context.chatId].maxwarns}) *club${aab} (${user_info.name}).`);
	}


}         catch (e)
        {
            return context.reply(`${e} error`)
        } 

}

try{ 
const [user_info] = await vk.api.users.get({ user_ids: u}); 
if(!chats[context.chatId].users[user_info.id]) {
    chats[context.chatId].users[user_info.id] = {
            rank: 0,
            warns: 0,
            name: `${user_info.first_name}`, 
            banned: 0,
            autokick: 0,
            vkid: user_info.id,
            muted: 0
        }
}
chats[context.chatId].users[user_info.id].warns += Number(1)
if(chats[context.chatId].users[user_info.id].warns == chats[context.chatId].maxwarns) {
	chats[context.chatId].users[user_info.id].warns = 0;
	chats[context.chatId].users[user_info.id].banned = 50;
	chats[context.chatId].users[user_info.id].autokick = 1
    vk.api.messages.removeChatUser({ chat_id: context.chatId, member_id: user_info.id })
    .catch((error) => {return context.reply(`⚠ Не удалось исключить пользователя из беседы.\nВК ответил: ${error}`);
	});
		return context.reply(`*id${user_info.id} (${user_info.first_name} ${user_info.last_name}) получил максимальное предупреждение (${chats[context.chatId].maxwarns}/${chats[context.chatId].maxwarns}) и блокируется в беседе.`);
	}else{
		return context.reply(`Было выдано предупреждение (${chats[context.chatId].users[user_info.id].warns}/${chats[context.chatId].maxwarns}) *id${user_info.id} (${user_info.first_name} ${user_info.last_name}).`);
	}




}         catch (e)
        {
            return context.reply(`${e} error`)
        }
})

hearManager.hear(/([^]+)бан- (.*)/i, async (context) => {
if(context.$match[1] !== chats[context.chatId].botname) return;
let acces = 0
let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let c = b.items.find((item) => item.member_id === context.senderId);
if(c.is_owner) acces = 1
if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1
if(acces < 1) return context.reply(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
let i = context.$match[2].replace(/vk.com/ig, "") 
let j = i.replace("/", "") 
let p = j.replace(/https:/ig, "") 
let u = p.replace("//", "") 
console.log(u) 
let text = context.$match[2]
if(text.includes('[')) {
    u = u.replace("[", "") 
    console.log(u)
    u = u.replace("]", "") 
    console.log(u)
    u = u.split("|")
    console.log(u)
    var f = u[0];
    console.log(f)
    aab = f.replace("id", "")
    console.log(aab)
 
}

if(text.includes('club')) {

    
    aa = f.replace("club", "")
    console.log(aa)
    

try{ 
const [user_info] = await vk.api.groups.getById({ group_id: aa}); 
if(!chats[context.chatId].users[-aa]) {
    chats[context.chatId].users[-aa] = {
            rank: 0,
            warns: 0,
            name: `${user_info.name}`, 
            banned: 0,
            autokick: 0,
            vkid: -aa,
            muted: 0
        }
}
if(chats[context.chatId].users[-aa].banned < 1) return context.reply(`*club${aa} (${user_info.name}) отсутствует в бане.`)
chats[context.chatId].users[-aa].banned = 0
chats[context.chatId].users[-aa].autokick = 0
context.reply(`Участник *club${aa} (${user_info.name})  разбанен.`)



}         catch (e)
        {
            return context.reply(`${e} error`)
        }
 return;
}

try{ 
const [user_info] = await vk.api.users.get({ user_ids: u}); 
if(!chats[context.chatId].users[user_info.id]) {
    chats[context.chatId].users[user_info.id] = {
            rank: 0,
            warns: 0,
            name: `${user_info.first_name}`, 
            banned: 0,
            autokick: 0,
            vkid: user_info.id,
            muted: 0
        }
}
if(chats[context.chatId].users[user_info.id].banned < 1) return context.reply(`*id${user_info.id} (${user_info.first_name} ${user_info.last_name}) отсутствует в бане.`)
chats[context.chatId].users[user_info.id].banned = 0
chats[context.chatId].users[user_info.id].autokick = 0
context.reply(`Участник *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) разбанен.`)
vk.api.messages.removeChatUser({ chat_id: context.chatId, member_id: user_info.id}); 


}         catch (e)
        {
            return context.reply(`${e} error`)
        } 
})

hearManager.hear(/([^]+)бан (.*)/i, async (context) => {
if(context.$match[1] !== chats[context.chatId].botname) return;
let acces = 0
let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let c = b.items.find((item) => item.member_id === context.senderId);
if(c.is_owner) acces = 1
if(chats[context.chatId].users[context.senderId].rank >= 9) acces = 1
if(acces < 1) return context.reply(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
let i = context.$match[2].replace(/vk.com/ig, "") 
let j = i.replace("/", "") 
let p = j.replace(/https:/ig, "") 
let u = p.replace("//", "") 
console.log(u) 
let text = context.$match[2]
if(text.includes('[')) {
    u = u.replace("[", "") 
    console.log(u)
    u = u.replace("]", "") 
    console.log(u)
    u = u.split("|")
    console.log(u)
    var f = u[0];
    console.log(f)
    aa = f.replace("id", "")
    console.log(aa)
 
}

if(text.includes('club')) {

    aab = f.replace("club", "")
    console.log(aab)
    

try{ 
const [user_info] = await vk.api.groups.getById({ group_id: aa}); 
if(!chats[context.chatId].users[-aab]) {
    chats[context.chatId].users[-aab] = {
            rank: 0,
            warns: 0,
            name: `${user_info.name}`, 
            banned: 0,
            autokick: 0,
            vkid: -aab,
            muted: 0
        }
}

if(chats[context.chatId].users[-aab].banned > 0) return context.reply(`*club${aab} (${user_info.name}) уже находится в бане.`)
{
chats[context.chatId].users[-aab].banned = 50
chats[context.chatId].users[-aab].autokick = 1
chats[context.chatId].users[-aab].warns = 0;
context.reply(`*club${aab} (${user_info.name}) было заблокировано.`)
    vk.api.messages.removeChatUser({ chat_id: context.chatId, member_id: -aab })
    .catch((error) => {return context.reply(`⚠ Не удалось исключить сообщество из беседы.\nВК ответил: ${error}`);
	});
	}

}        catch (e)
        {
            return context.reply(`${e} error`)
        } 
}


try{ 
const [user_info] = await vk.api.users.get({ user_ids: u}); 
if(!chats[context.chatId].users[user_info.id]) {
    chats[context.chatId].users[user_info.id] = {
            rank: 0,
            warns: 0,
            name: `${user_info.first_name}`, 
            banned: 0,
            autokick: 0,
            vkid: user_info.id,
            muted: 0
        }
}

if(chats[context.chatId].users[user_info.id].banned > 0) return context.reply(`Участник *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) уже находится в бане.`)
{
chats[context.chatId].users[user_info.id].banned = 50
chats[context.chatId].users[user_info.id].autokick = 1
chats[context.chatId].users[user_info.id].warns = 0;
context.reply(`Участник *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) был заблокирован.`)
    vk.api.messages.removeChatUser({ chat_id: context.chatId, member_id: user_info.id })
    .catch((error) => {return context.reply(`⚠ Не удалось исключить пользователя из беседы.\nВК ответил: ${error}`);
	});
	}

}         catch (e)
        {
            return context.reply(`${e} error`)
        } 
})

hearManager.hear(/^(?:([^]+)преды)$/i, (context) => {
if(context.$match[1] !== chats[context.chatId].botname) return;
    let top = []
    let topme = []

    for (let i in chats[context.chatId].users){
        if(chats[context.chatId].users[i].warns !== 0){
    top.push({ 
    id: i, 
    vkid: chats[context.chatId].users[i].vkid, 
    name: chats[context.chatId].users[i].name, 
    balance: chats[context.chatId].users[i].warns
})
}
    }
    top.sort(function(a, b) { 
if (b.balance > a.balance) return 1 
if (b.balance < a.balance) return -1 
return 0
});

let text = ""
for (let s = 0; s < top.length; s++){
    topme.push(top[s].id)
}

if (top.length < 25){
    for (let j = 0; j < top.length; j++){
        text += (j + 1) + `› *id${top[j].vkid} (${top[j].name}) - (${top[j].balance})\n`
    }
} else {
    for (let j = 0; j < 25; j++){
        text += (j + 1) + `› *id${top[j].vkid} (${top[j].name}) - (${top[j].balance})/\n`
    }
} 
    if(text == ``) return context.reply(`В беседе нет ни одного заварненного участника!`)
    return context.reply("Пользователи, с предупреждениями:\n "+text+"\n\n") 
    return context.replyMessage;
})


hearManager.hear(/^(?:([^]+)баны)$/i, (context) => {
if(context.$match[1] !== chats[context.chatId].botname) return;
    let top = []
    let topme = []

    for (let i in chats[context.chatId].users){
        if(chats[context.chatId].users[i].banned !== 0){
    top.push({ 
    id: i, 
    vkid: chats[context.chatId].users[i].vkid, 
    name: chats[context.chatId].users[i].name, 
    balance: chats[context.chatId].users[i].banned
})
}
    }
    top.sort(function(a, b) { 
if (b.balance > a.balance) return 1 
if (b.balance < a.balance) return -1 
return 0
}); 

let text = ""
for (let s = 0; s < top.length; s++){
    topme.push(top[s].id)
}

if (top.length < 25){
    for (let j = 0; j < top.length; j++){
        text += (j + 1) + `› *id${top[j].vkid} (${top[j].name})\n`
    }
} else {
    for (let j = 0; j < 25; j++){
        text += (j + 1) + `› *id${top[j].vkid} (${top[j].name})/\n`
    }
} 
    if(text == ``) return context.reply(`В беседе нет ни одного забаненного участника!`)
    return context.reply("Пользователи, находящиеся в бане:\n "+text+"\n\n") 
    return context.replyMessage;
})


hearManager.hear(/^(?:([^]+)статусы)$/i, (context) => {
    if(context.$match[1] !== chats[context.chatId].botname) return;
    let top = []
    let topme = []

    for (let i in chats[context.chatId].users){
        if(chats[context.chatId].users[i].rank !== 0){
    top.push({ 
    id: i, 
    vkid: chats[context.chatId].users[i].vkid, 
    name: chats[context.chatId].users[i].name, 
    balance: chats[context.chatId].users[i].rank
})
}
    }
    top.sort(function(a, b) { 
if (b.balance > a.balance) return 1 
if (b.balance < a.balance) return -1 
return 0
});

let text = ""
for (let s = 0; s < top.length; s++){
    topme.push(top[s].id)
}

if (top.length < 25){
    for (let j = 0; j < top.length; j++){
        text += (j + 1) + `› *id${top[j].vkid} (${top[j].name}) - ${top[j].balance} 👑\n`
    }
} else {
    for (let j = 0; j < 25; j++){
        text += (j + 1) + `› *id${top[j].vkid} (${top[j].name}) - ${top[j].balance} 👑 /\n`
    }
} 

    return context.reply("Статусы пользователей:\n "+text+"\n\n") 
    return context.replyMessage;
})


hearManager.hear(/([^]+)кик (.*)/i, async (context) => {
    if(context.$match[1] !== chats[context.chatId].botname) return;
let acces = 0
let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let c = b.items.find((item) => item.member_id === context.senderId);
if(c.is_owner) acces = 1
if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1
if(acces < 1) return context.reply(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
let i = context.$match[2].replace(/vk.com/ig, "") 
let j = i.replace("/", "") 
let p = j.replace(/https:/ig, "") 
let u = p.replace("//", "") 
console.log(u) 
let text = context.$match[2]
if(text.includes('[')) {
    u = u.replace("[", "") 
    console.log(u)
    u = u.replace("]", "") 
    console.log(u)
    u = u.split("|")
    console.log(u)
    var f = u[0];
    console.log(f)
    aa = f.replace("id", "")
    console.log(aa)

 
 
}
if(text.includes('club')) {
    aab = f.replace("club", "")
    console.log(aab)
vk.api.messages.removeChatUser({ chat_id: context.chatId, member_id: -aab}); 
 
return;
 
}
    console.log(aa)
try{ 
const [user_info] = await vk.api.users.get({ user_ids: aa}); 
if(!chats[context.chatId].users[user_info.id]) {
    chats[context.chatId].users[user_info.id] = {
            rank: 0,
            warns: 0,
            name: `${user_info.first_name}`, 
            banned: 0,
            autokick: 0,
            vkid: user_info.id,
            muted: 0
        }
}
let b = user_info.id

vk.api.messages.removeChatUser({ chat_id: context.chatId, member_id: b}); 
}         catch (e)
        {
            return context.reply(`${e} error`)
        } 
})

hearManager.hear(/([^]+)мут- (.*)/i, async (context) => {
    if(context.$match[1] !== chats[context.chatId].botname) return;
let acces = 0
let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let c = b.items.find((item) => item.member_id === context.senderId);
if(c.is_owner) acces = 1
if(chats[context.chatId].users[context.senderId].rank > 7) acces = 1
if(acces < 1) return context.reply(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
let i = context.$match[2].replace(/vk.com/ig, "") 
let j = i.replace("/", "") 
let p = j.replace(/https:/ig, "") 
let u = p.replace("//", "") 
console.log(u) 
let text = context.$match[2]
if(text.includes('[')) {
    u = u.replace("[", "") 
    console.log(u)
    u = u.replace("]", "") 
    console.log(u)
    u = u.split("|")
    console.log(u)
    var f = u[0];
    console.log(f)
    aa = f.replace("id", "")
    console.log(aa)
 
 
}

if(text.includes('club')) {

    aab = f.replace("club", "")
    console.log(aab)


try{ 
const [user_info] = await vk.api.groups.getById({ group_id: aab}); 
if(!chats[context.chatId].users[-aab]) {
    chats[context.chatId].users[-aab] = {
            rank: 0,
            warns: 0,
            name: `${user_info.name}`, 
            banned: 0,
            autokick: 0,
            vkid: -aab,
            muted: 0
        }
}

if(chats[context.chatId].users[-aab].muted == 0) return context.reply(`Участник *club${aab} (${user_info.name}) не находится в муте`)
chats[context.chatId].users[-aab].muted = 0
return context.reply(`Участник *club${aab} (${user_info.name}) теперь может общаться в чате.`)


}         catch (e)
        {
            return context.reply(`${e} error`)
        } 

}
try{ 
const [user_info] = await vk.api.users.get({ user_ids: u}); 
if(!chats[context.chatId].users[user_info.id]) {
    chats[context.chatId].users[user_info.id] = {
            rank: 0,
            warns: 0,
            name: `${user_info.first_name}`, 
            banned: 0,
            autokick: 0,
            vkid: user_info.id,
            muted: 0
        }
}
if(chats[context.chatId].users[user_info.id].muted == 0) return context.reply(`Участник *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) не находится в муте`)
chats[context.chatId].users[user_info.id].muted = 0
return context.reply(`Участник *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) теперь может общаться в чате.`)


}         catch (e)
        {
            return context.reply(`${e} error`)
        } 
})

hearManager.hear(/([^]+)терпи- (.*)/i, async (context) => {
    if(context.$match[1] !== chats[context.chatId].botname) return;
let acces = 0
let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let c = b.items.find((item) => item.member_id === context.senderId);
if(c.is_owner) acces = 1
if(chats[context.chatId].users[context.senderId].rank > 7) acces = 1
if(acces < 1) return context.reply(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
let i = context.$match[2].replace(/vk.com/ig, "") 
let j = i.replace("/", "") 
let p = j.replace(/https:/ig, "") 
let u = p.replace("//", "") 
console.log(u) 
let text = context.$match[2]
if(text.includes('[')) {
    u = u.replace("[", "") 
    console.log(u)
    u = u.replace("]", "") 
    console.log(u)
    u = u.split("|")
    console.log(u)
    var f = u[0];
    console.log(f)
    aa = f.replace("id", "")
    console.log(aa)
 
 
}

if(text.includes('club')) {

    aab = f.replace("club", "")
    console.log(aab)

try{ 
const [user_info] = await vk.api.groups.getById({ group_id: aab}); 
if(!chats[context.chatId].users[-aab]) {
    chats[context.chatId].users[-aab] = {
            rank: 0,
            warns: 0,
            name: `${user_info.name}`, 
            banned: 0,
            autokick: 0,
            vkid: -aab,
            muted: 0
        }
}

if(chats[context.chatId].users[-aab].muted == 0) return context.reply(`Участник *club${aab} (${user_info.name}) не находится в терпении`)
chats[context.chatId].users[-aab].muted = 0
return context.reply(`Участник *club${aab} (${user_info.name}) теперь может не терпеть в чате.`)


}         catch (e)
        {
            return context.reply(`${e} error`)
        } 

}
try{ 
const [user_info] = await vk.api.users.get({ user_ids: u}); 
if(!chats[context.chatId].users[user_info.id]) {
    chats[context.chatId].users[user_info.id] = {
            rank: 0,
            warns: 0,
            name: `${user_info.first_name}`, 
            banned: 0,
            autokick: 0,
            vkid: user_info.id,
            muted: 0
        }
}
if(chats[context.chatId].users[user_info.id].muted == 0) return context.reply(`Участник *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) не находится в терпении`)
chats[context.chatId].users[user_info.id].muted = 0
return context.reply(`Участник *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) теперь может не терпеть в чате.`)


}         catch (e)
        {
            return context.reply(`${e} error`)
        } 
})

hearManager.hear(/([^]+)помощь/i, async (context) => {
	if(context.$match[1] !== chats[context.chatId].botname) return;
	context.send(`Все команды находятся в статье:\nvk.com/@managechat-commands`)
});


hearManager.hear(/([^]+)мут (.*)/i, async (context) => {
    if(context.$match[1] !== chats[context.chatId].botname) return;
let acces = 0
let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
let c = b.items.find((item) => item.member_id === context.senderId);
if(c.is_owner) acces = 1
if(chats[context.chatId].users[context.senderId].rank > 7) acces = 1
if(acces < 1) return context.reply(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
let i = context.$match[2].replace(/vk.com/ig, "") 
let j = i.replace("/", "") 
let p = j.replace(/https:/ig, "") 
let u = p.replace("//", "") 
console.log(u) 
let text = context.$match[2]
if(text.includes('[')) {
    u = u.replace("[", "") 
    console.log(u)
    u = u.replace("]", "") 
    console.log(u)
    u = u.split("|")
    console.log(u)
    var f = u[0];
    console.log(f)
    aa = f.replace("id", "")
    console.log(aa)
 
 
}

if(text.includes('club')) {

    aab = f.replace("club", "")
    console.log(aab)

try{ 
const [user_info] = await vk.api.groups.getById({ group_id: aab}); 
if(!chats[context.chatId].users[-aab]) {
    chats[context.chatId].users[-aab] = {
            rank: 0,
            warns: 0,
            name: `${user_info.name}`, 
            banned: 0,
            autokick: 0,
            vkid: -aab,
            muted: 0
        }
}
if(chats[context.chatId].users[-aab].rank >= 9) return context.reply(`Невозможно выдать мут участнику выше или равному вашему статусу.`)
if(chats[context.chatId].users[-aab].muted > 0) return context.reply(`Участник *club${aab} (${user_info.name}) уже не может общаться в чате.`)
chats[context.chatId].users[-aab].muted = 50
return context.reply(`Участнику *club${aab} (${user_info.name}) выдан мут. Теперь он не может общаться в чате.`)


}         catch (e)
        {
            return context.reply(`${e} error`)
        } 

}



try{ 
const [user_info] = await vk.api.users.get({ user_ids: u}); 
if(!chats[context.chatId].users[user_info.id]) {
    chats[context.chatId].users[user_info.id] = {
            rank: 0,
            warns: 0,
            name: `${user_info.first_name}`, 
            banned: 0,
            autokick: 0,
            vkid: user_info.id,
            muted: 0
        }
}
if(chats[context.chatId].users[user_info.id].rank >= 9) return context.reply(`Невозможно выдать мут участнику выше или равному вашему статусу.`)
if(chats[context.chatId].users[user_info.id].muted > 0) return context.reply(`Участник *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) уже не может общаться в чате.`)
chats[context.chatId].users[user_info.id].muted = 50
return context.reply(`Участнику *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) выдан мут. Теперь он не может общаться в чате.`)


}         catch (e)
        {
            return context.reply(`${e} error`)
        } 
})

hearManager.hear(/([^]+)терпи (.*)/i, async (context) => {

    if(context.$match[1] !== chats[context.chatId].botname) return;

    let acces = 0

    let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 

    let c = b.items.find((item) => item.member_id === context.senderId);

    if(c.is_owner) acces = 1

    if(chats[context.chatId].users[context.senderId].rank > 7) acces = 1

    if(acces < 1) return context.reply(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 

    let i = context.$match[2].replace(/vk.com/ig, "") 

    let j = i.replace("/", "") 

    let p = j.replace(/https:/ig, "") 

    let u = p.replace("//", "") 

    console.log(u) 

    let text = context.$match[2]

    if(text.includes('[')) {
        u = u.replace("[", "") 
        u = u.replace("]", "") 
        u = u.split("|")
        var f = u[0];
        aa = f.replace("id", "")
    }

    if(text.includes('club')) {

        aab = f.replace("club", "")
        console.log(aab)

        try
        { 
            const [user_info] = await vk.api.groups.getById({ group_id: aab}); 
            if(!chats[context.chatId].users[-aab]) {
                chats[context.chatId].users[-aab] = {
                        rank: 0,
                        warns: 0,
                        name: `${user_info.name}`, 
                        banned: 0,
                        autokick: 0,
                        vkid: -aab,
                        muted: 0
                    }
            }

            if(chats[context.chatId].users[-aab].rank >= 9) return context.reply(`Вы не можете заставить терпеть этого участника, так как он выше или равен вашему статусу.`)

            if(chats[context.chatId].users[-aab].muted > 0) return context.reply(`Участник *club${aab} (${user_info.name}) уже терпит в чате.`)

            chats[context.chatId].users[-aab].muted = 50

            return context.reply(`Участник *club${aab} (${user_info.name}) терпит.`)

        }         
        catch (e)
        {
            return context.reply(`${e} error`)
        } 

    }

    try
    { 
        const [user_info] = await vk.api.users.get({ user_ids: u}); 
        if(!chats[context.chatId].users[user_info.id]) {
            chats[context.chatId].users[user_info.id] = {
                    rank: 0,
                    warns: 0,
                    name: `${user_info.first_name}`, 
                    banned: 0,
                    autokick: 0,
                    vkid: user_info.id,
                    muted: 0
                }
        }

        if(chats[context.chatId].users[user_info.id].rank >= 9) return context.reply(`Вы не можете заставить терпеть этого участника, так как он выше или равен вашему статусу.`)

        if(chats[context.chatId].users[user_info.id].muted > 0) return context.reply(`Участник *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) уже терпит в чате.`)

        chats[context.chatId].users[user_info.id].muted = 50

        return context.reply(`Участник *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) терпит.`)

    }         
    catch (e)
    {
            return context.reply(`${e} error`)
    } 
})


hearManager.hear(/([^]+)статус (.*) ([0-9]+)/i, async (context) => {

    if(context.$match[1] !== chats[context.chatId].botname) return;
    let acces = 0
    let b = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 
    let c = b.items.find((item) => item.member_id === context.senderId);
    if(c.is_owner) acces = 1
    if(chats[context.chatId].users[context.senderId].rank > 8) acces = 1
    if(acces < 1) return context.reply(`У вас нет доступа (${chats[context.chatId].users[context.senderId].rank} < 9) к этой команде.`) 
    let i = context.$match[2].replace(/vk.com/ig, "") 
    let j = i.replace("/", "") 
    let p = j.replace(/https:/ig, "") 
    let u = p.replace("//", "") 
    console.log(u) 
    let text = context.$match[2]
    if(text.includes('[')) {
        u = u.replace("[", "") 
        console.log(u)
        u = u.replace("]", "") 
        console.log(u)
        u = u.split("|")
        console.log(u)
        var f = u[0];
        console.log(f)
        aa = f.replace("id", "")
        console.log(aa)
     
     
    }

    if(text.includes('club')) {

        aab = f.replace("club", "")
        console.log(aab)
        try { 

            if(!chats[context.chatId].users[aab]) {
                chats[context.chatId].users[aab] = {
                        rank: 0,
                        warns: 0,
                        name: ``, 
                        banned: 0,
                        autokick: 0,
                        vkid: -aab,
                        muted: 0
                    }
            }
            if(context.$match[3] > Number(9)) return context.reply(`Вы не можете изменять статус на более высокий или равный вашему.`)
            chats[context.chatId].users[aab].rank = Number(context.$match[3])
            return context.reply(`*${aa} (Сообществу) выдан статус ${context.$match[3]}`)
        }
        catch (e)
        {
            return context.reply(`${e} error`)
        } 
        return;
    }    

    try { 
        const [user_info] = await vk.api.users.get({ user_ids: u}); 
        if(!chats[context.chatId].users[user_info.id]) {
            chats[context.chatId].users[user_info.id] = {
                    rank: 0,
                    warns: 0,
                    autokick: 0,
                    name: `${user_info.first_name}`, 
                    banned: 0,
                    vkid: user_info.id,
                    muted: 0
                }
    }
    if(context.$match[3] > Number(9)) return context.reply(`Вы не можете изменять статус на более высокий или равный вашему.`)
    chats[context.chatId].users[user_info.id].rank = Number(context.$match[3])
    return context.reply(`Пользователю *id${user_info.id} (${user_info.first_name} ${user_info.last_name}) выдан статус ${context.$match[3]}`)


    } 
    catch (e)
    {
        return context.reply(`${e} error`)
    } 
})

hearManager.hear(/([^]+)обновить/i, async (context) => {

    if(context.$match[1] !== chats[context.chatId].botname) return;

    // console.log(context)

    if(context.senderType == "group") return;

    const [user_info] = await vk.api.users.get({ user_ids: context.senderId });

    console.log(user_info)

    if(!context.senderId < 0)
    {
        if(!chats[context.chatId].users[user_info.id]) {
            chats[context.chatId].users[user_info.id] = {
                    rank: 0,
                    warns: 0,
                    autokick: 0,
                    name: `${user_info.first_name}`, 
                    banned: 0,
                    vkid: user_info.id,
                    muted: 0
                }
        }
    }
    else
    {
        if(!chats[context.chatId].users[user_info.id]) {
            chats[context.chatId].users[user_info.id] = {
                    rank: 0,
                    warns: 0,
                    autokick: 0,
                    name: `${user_info.name}`, 
                    banned: 0,
                    vkid: user_info.id,
                    muted: 0
                }
        }
    }
    var b = await vk.api.messages.getConversationsById({peer_ids: context.peerId}); 

    console.log(b)

    console.log(b.items[0].chat_settings.owner_id)

    chats[context.chatId].ownerid = b.items[0].chat_settings.owner_id
    chats[context.chatId].users[b.items[0].chat_settings.owner_id].rank = 10
    chats[context.chatId].chatname = `${b.items[0].chat_settings.title}`

    let g = -managerid

    let users = await vk.api.messages.getConversationMembers({peer_id: context.peerId}); 

    let admin = users.items.find((item) => item.member_id === context.senderId);

    console.log(admin);

    if (admin.is_admin)
    {
        chats[context.chatId].users[context.senderId].rank = 8
    }

    let user = users.items.find((item) => item.member_id === g);
    if (user.is_admin) return context.reply(`Я бот-менеджер. Всем привет! 🔱`)
    return context.reply(`Я не являюсь администратором данной беседы.`)

})

const tcpp = require('tcp-ping');

hearManager.hear(/^(?:пинг|ping|ms|подключение|connect)\s?([^]+)?/i, (message) => { 
    var http = message.$match[1];
    if(!http) return message.send(`Вы не ввели адрес сайта.`)
        tcpp.ping({address: http }, function(err, data) {
            console.log(`${data}`)
            return message.send(`&#8987; Подключение нашего сервера, до сайта: "${http}" составляет: ${Math.round(data.avg)} ms.`)
        });
})


/*======================================Команды бота=======================================*/

async function run() {
	//await user.startPolling();
    await vk.updates.startPolling();
    console.log(chalk.red(">_ Manager Activated"));
}
 
run().catch(console.error);
// Получаем UnixDate в секундах
function getUnix() {
    return Math.floor(Date.now() / 1000);
}

function rand(text) {
    let tts = Math.floor(text.length * Math.random())
    return text[tts]
}

function getRandomInt(min, max){return Math.round(Math.random() * (max - min)) + min}
Array.prototype.random = function(){return this[Math.floor(this.length * Math.random())];}
/*=========================================================================================*/

