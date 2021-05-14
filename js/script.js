const productsBtn = document.querySelectorAll('.btn');
const productsBtnCount = document.querySelectorAll('.trashBtn');
const productsFinalPrice = document.querySelectorAll('.allPriceItem');
const productsBtnDelete = document.querySelectorAll('.deleteBtn');
const shop = document.querySelector('.shop');
const item = shop.querySelectorAll('.item');
var priceAll = 0;
let price = 0;

const priceWithoutSpaces = (str) => {
	return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

$('.shop').on('click', '.btn', function(e) {
	let self = e.currentTarget;
	let parent = self.closest('.item');
	clonedNode = parent.cloneNode(true);
	clonedNode.querySelector(".btn").remove();
	let countPrice = document.createElement('div');
	countPrice.className = "countPrice";
	countPrice.innerHTML = "<button class = 'trashBtn' name = 'btnPlus'>+</button><div class = 'outputCount'>0</div><button class = 'trashBtn' name = 'btnMinus'>-</button>";
	let countPriceDelete = document.createElement('div');
	countPriceDelete.innerHTML = "<button class = 'deleteBtn' name = 'deleteBtn'>+</button><div class = 'allPriceItem'></div>";
	clonedNode.appendChild(countPrice);
	clonedNode.appendChild(countPriceDelete);
	countPrice.className = "countPrice1";
	document.querySelector(".cart").append(clonedNode);
	self.disabled = true;
})
	
$('.trash').on('click', '.trashBtn', function(e){
	let self = e.currentTarget;
	let output = self.closest('.item');
	let count = parseInt(output.querySelector(".outputCount").textContent);
	let priceNumber = parseInt(priceWithoutSpaces(output.querySelector('.price').textContent));
	if(self.getAttribute("name") === 'btnPlus'){
		count += 1;
		countPriceEnd = count*priceNumber;
		output.querySelector(".outputCount").innerHTML = count;
		output.querySelector(".allPriceItem").innerHTML = countPriceEnd;
		var a = 0;
		$(".allPriceItem").each(function(){
			a += +$(this).text();
			$(".finalPrice").text("Итог: "+a);	
		})
	}
	if(self.getAttribute("name") === 'btnMinus'){
		if(count > 0)
			count -= 1;
		else{
			return 0;
		}
		countPriceEnd = count*priceNumber;
		output.querySelector(".outputCount").innerHTML = count;
		output.querySelector(".allPriceItem").innerHTML = countPriceEnd;
		var a = 0;
		$(".allPriceItem").each(function(){
			a += +$(this).text();
			$(".finalPrice").text("Итог: "+a);	
		})
				
	}	
})

$('.trash').on('click', '.allRemove', function(e){
	document.querySelector(".cart").innerHTML = "";
	productsBtn.forEach(el => {
		el.disabled = false;
	})
	document.querySelector(".finalPrice").innerHTML = ""; 
})

$('.trash').on('click', '.deleteBtn', function(e){
		let self1 = e.currentTarget;
		let deleteItem = self1.closest('.item');
		let deleteId = deleteItem.querySelector(".product")
		let id = deleteId.getAttribute('data-id');
		item.forEach(el => {
		let item1 = el.querySelector(".product")
		if(item1.getAttribute('data-id') === id)
			el.querySelector(".btn").disabled = false;
		deleteItem.remove();
		var a = 0;
		$(".allPriceItem").each(function(){
			a += +$(this).text();
			$(".finalPrice").text("Итог: "+a);
		})
	})
	if($(".allPriceItem").length === 0){
		$(".finalPrice").text("Итог: "+0);
	}	
		
})