const btn = document.querySelector("#btn");
const Label = document.querySelector("#Label");
const instructionText = document.querySelector("#instruction-text");
const copyBtn = document.querySelector("#copy-btn");
const canvas = document.getElementById("Matrix");
const context = canvas.getContext("2d");



// for generating the password
const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'; 
let password = "";


function generatePassword() {
	instructionText.style.display = 'none';

    password = ""
     for (let i = 0; i < 12; i++) {
        const arr = new Uint32Array(1);
		crypto.getRandomValues(arr);
		char = arr[0] % characters.length;
        password += characters[char]   
    }

    return Label.textContent = password;
}
btn.addEventListener("click", generatePassword)


function copyPassword () {
	if (password) {
		navigator.clipboard.writeText(password)
		copyBtn.textContent = "Copied!";
		setTimeout(() => copyBtn.textContent = "Copy", 2000);
	}
}

copyBtn.addEventListener("click", copyPassword)





// for the Matrix rain effect
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width/fontSize;

const rainDrops = [];

for( let x = 0; x < columns; x++ ) {
	rainDrops[x] = 1;
}

const draw = () => {
	context.fillStyle = 'rgba(0, 0, 0, 0.05)';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.fillStyle = '#0F0';
	context.font = fontSize + 'px monospace';

	for(let i = 0; i < rainDrops.length; i++)
	{
		const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
		context.fillText(text, i*fontSize, rainDrops[i]*fontSize);
		
		if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){
			rainDrops[i] = 0;
        }
		rainDrops[i]++;
	}
	
};

setInterval(draw, 45);





