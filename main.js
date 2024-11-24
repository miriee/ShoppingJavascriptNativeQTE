import products from "./data.json" with { type: "json" };

let blocArticle = document.querySelector('.container');
let divListeCard = document.querySelector('.offcanvas-body');

let listCard = JSON.parse(localStorage.getItem('listCard')) || [];

let badge = document.querySelector('.badge');

// affichage des products card avec la method map
products.map((oneProduct) => {
    const card = document.createElement("div");
    card.classList.add("affichecard");
    card.style.border = "2px solid green"

    const img = document.createElement("img");
    img.src = oneProduct.urlImage;
    img.classList.add("imgwidth");

    const title = document.createElement("p");
    title.innerHTML = oneProduct.title;

    const price = document.createElement("p");
    price.innerHTML = oneProduct.prix;

    const btn = document.createElement("button");
    btn.innerHTML = "Ajouter au panier";
    btn.setAttribute("class", "btn btn-success")
    btn.addEventListener("click", () => addPanier(oneProduct))

    blocArticle.appendChild(card);
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(btn);
})

function addPanier(oneProduct) {
    divListeCard.innerHTML = ""

    // index de l'element ajouter
    let index = listCard.findIndex(item => item.title === oneProduct.title);

    if (index === -1) {
        listCard = [...listCard, { ...oneProduct, quantity: 1 }];
    } else {
        listCard[index] = { ...oneProduct, quantity: listCard[index].quantity + 1 };
    }
    localStorage.setItem("listCard", JSON.stringify(listCard));
    afficheListCard()
}

// Affichage liste card panier
let tabPrice = []
function afficheListCard() {
    divListeCard.innerHTML = ""
    badge.innerHTML = listCard.length
    if (listCard.length > 0) {
        const tab = document.createElement('div');
        tab.style.display = "flex";
        tab.style.flexWrap = "wrap";
        tab.style.justifyContent = "space-between";
        tab.style.alignItems = "center"
        tab.style.height = "100px"

        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        const p3 = document.createElement("p");
        const p4 = document.createElement("p");

        p1.innerHTML = "Image de produit";
        p2.innerHTML = "Quantité";
        p3.innerHTML = "Prix";
        p4.innerHTML = "Action";

        tab.appendChild(p1)
        tab.appendChild(p2)
        tab.appendChild(p3)
        tab.appendChild(p4)

        divListeCard.appendChild(tab);

        for (let j = 0; j < listCard.length; j++) {
            const div = document.createElement('div');
            div.style.display = "flex";
            div.style.flexWrap = "wrap";
            div.style.justifyContent = "space-between";
            div.style.alignItems = "center"
            div.style.height = "100px"

            const image = document.createElement('img');
            image.style.width = "125px"
            image.style.height = "100%"
            image.src = listCard[j].urlImage;

            const btnAdd = document.createElement('i');
            btnAdd.setAttribute("class", "fa fa-plus-circle")
            btnAdd.addEventListener("click", () => addPanier(listCard[j]));

            const qte = document.createElement("span");
            qte.style.paddingInline = "2px";
            qte.innerHTML = listCard[j].quantity;

            const btnRemove = document.createElement('i');
            btnRemove.setAttribute("class", "fa fa-minus-circle")
            btnRemove.addEventListener("click", () => {
                if (listCard[j].quantity > 1) {
                    listCard[j].quantity--
                    console.log(listCard[j].quantity);
                    localStorage.setItem("listCard", JSON.stringify(listCard));
                    afficheListCard();
                } else {
                    deleteProduct(j)
                }
            });

            const prix = document.createElement('p');
            prix.style.margin = "0"
            prix.innerHTML = parseFloat(listCard[j].prix) * listCard[j].quantity + "DT";

            // icon delete 
            const deleteOneProduct = document.createElement('i')
            deleteOneProduct.setAttribute('class', "fa fa-trash")
            deleteOneProduct.style.width = "30px"
            deleteOneProduct.style.color = "black"
            // delete one element
            deleteOneProduct.addEventListener("click", () => deleteProduct(j))
            const divQTE = document.createElement('div')

            div.appendChild(image)
            div.appendChild(divQTE)
            divQTE.appendChild(btnRemove)
            divQTE.appendChild(qte)
            divQTE.appendChild(btnAdd)
            div.appendChild(prix)
            div.appendChild(deleteOneProduct)

            divListeCard.appendChild(div);

            const hr = document.createElement('hr');
            divListeCard.appendChild(hr);

        }

        tabPrice = []
        calculTotal()

        const total = document.createElement('p');
        total.innerHTML = "Total à payer : " + "      " + totalSomme + " DT"
        divListeCard.appendChild(total)

        let deleteAll = document.createElement('button');
        deleteAll.setAttribute('class', "btn btn-danger")
        deleteAll.innerHTML = "Vider le panier"
        deleteAll.addEventListener('click', viderPanier)
        divListeCard.appendChild(deleteAll)
    } else {
        let h3 = document.createElement('h3');
        h3.innerHTML = "LISTE VIDE"
        divListeCard.appendChild(h3)
    }
}

function deleteProduct(j) {
    listCard.splice(j, 1);
    localStorage.setItem('listCard', JSON.stringify(listCard));
    divListeCard.innerHTML = ""
    afficheListCard()
}

let totalSomme

function calculTotal() {
    if (listCard.length > 0) {
        listCard.map((oneProduct) => {
            tabPrice = [...tabPrice, parseFloat(oneProduct.prix) * oneProduct.quantity]
        })
        totalSomme = tabPrice.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0,
        );
    }

}
afficheListCard()

function viderPanier() {
    listCard = []
    localStorage.setItem('listCard', JSON.stringify(listCard));
    afficheListCard()
}