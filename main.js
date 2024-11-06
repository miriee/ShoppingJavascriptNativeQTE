// import products from "./data.json" assert { type: "json" };
import products from "./data.json" with { type: "json" };

let blocArticle = document.querySelector('.container');
let divListeCard = document.querySelector('.offcanvas-body');

// let product1 = {
//     urlImage: "https://tdiscount.tn/blog/wp-content/uploads/2022/07/pc-1024x585.jpg",
//     title: "Clavier souris Casque",
//     prix: "300 DT"
// }

// let product2 = {
//     urlImage: "https://tn.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/17/3967/1.jpg?6886",
//     title: "Sac à Dos PC Portable",
//     prix: "69 DT"
// }
// let product3 = {
//     urlImage: "https://mk-media.mytek.tn/media/catalog/product/cache/8be3f98b14227a82112b46963246dfe1/a/d/adaptateur-de-charge-xiaomi-fast-charge-33w-type-c--type-a---blanc1.jpg",
//     title: "Adaptateur De Charge XIAOMI",
//     prix: "59 DT"
// }

// let product4 = {
//     urlImage: "https://mk-media.mytek.tn/media/catalog/product/cache/8be3f98b14227a82112b46963246dfe1/6/8/68132_9ns1drim4k8fbl3d_1_1.jpg",
//     title: "disque Dur Externe Anti-choc Adata Hd330 1to Usb 3.2 - Rouge",
//     prix: "189 DT"
// }
// let product5 = {
//     urlImage: "https://tn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/50/2067/1.jpg",
//     title: "Support Pour Pc Portable",
//     prix: "68 DT"
// }

// let product6 = {
//     urlImage: "https://media.ouest-france.fr/v1/pictures/MjAyMzA5ZGQwNDBkMDcwMDBhODNiYzVhYWE0MTYzMmZiMGZlMGY",
//     title: "Support Pc",
//     prix: "1200 DT"
// }

// let products = [product1, product2, product3, product4, product5, product6];


let listCard = JSON.parse(localStorage.getItem('listCard')) || [];


// affichage des products card avec la boucle for
// for (let i = 0; i < products.length; i++) {
//     const card = document.createElement("div");
//     // card.style.textAlign = "center";
//     card.classList.add("affichecard");
//     card.style.border = "2px solid green"

//     const img = document.createElement("img");
//     img.src = products[i].urlImage;
//     img.classList.add("imgwidth");

//     const title = document.createElement("p");
//     title.innerHTML = products[i].title;

//     const price = document.createElement("p");
//     price.innerHTML = products[i].prix;

//     const btn = document.createElement("button");
//     btn.innerHTML = "Ajouter au panier";
//     btn.setAttribute("class", "btn btn-success")
//     btn.addEventListener("click", () => {
//         divListeCard.innerHTML = ""
//         listCard.push(products[i])
//         localStorage.setItem("listCard", JSON.stringify(listCard));

//         // location.reload();
//         afficheListCard()
//     })

//     blocArticle.appendChild(card);
//     card.appendChild(img);
//     card.appendChild(title);
//     card.appendChild(price);
//     card.appendChild(btn);
// }

// affichage des products card avec la method map
products.map((oneProduct) => {
    const card = document.createElement("div");
    // card.style.textAlign = "center";
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
    // listCard.push(oneProduct)

    // index de l'element ajouter
    let index = listCard.findIndex(item => item.title === oneProduct.title);

    // if index === -1 => l'objet n'existe pas dans le localstorage
    if (index === -1) {
        listCard = [...listCard, { ...oneProduct, quantity: 1 }];
    } else { // else => l'objet existe dans le localstorage
        listCard[index] = { ...oneProduct, quantity: listCard[index].quantity + 1 };
    }
    localStorage.setItem("listCard", JSON.stringify(listCard));
    afficheListCard()
}


// Affichage liste card panier
let tabPrice = []
function afficheListCard() {
    divListeCard.innerHTML = ""
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
            // divQTE.style.width = "100px"

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
    // totalSomme = 0
    // calculTotal()
    divListeCard.innerHTML = ""
    afficheListCard()
    // location.reload()

}

let totalSomme

function calculTotal() {
    if (listCard.length > 0) {
        listCard.map((oneProduct) => {
            // parseFloat(oneProduct.prix)
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
    // location.reload()
    afficheListCard()
    // alert("Panier vide")
}