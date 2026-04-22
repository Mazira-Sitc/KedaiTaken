// LOGIN ICON
const switchForm = document.getElementById("switch-form");
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const loginFooter = document.getElementById("login-footer");
const extraField = document.getElementById("extra-field");
const lostPasswordLink = document.getElementById("lost-password-link");
const lostPasswordMsg = document.getElementById("lost-password-msg");
const passwordGroup = document.getElementById("password-group");
const rememberWrap = document.getElementById("remember-wrap");

function showLoginMode() {
  formTitle.innerText = "Masuk";
  submitBtn.innerText = "MASUK";
  switchForm.innerText = "Buat Akun";

  extraField.style.display = "none";
  passwordGroup.style.display = "block";
  lostPasswordMsg.style.display = "none";
  loginFooter.style.display = "flex";
  rememberWrap.style.display = "block";
  lostPasswordLink.style.display = "inline-block";
}

switchForm.addEventListener("click", function (e) {
  e.preventDefault();
  if (this.innerText === "Buat Akun") {
    // Mode Register
    formTitle.innerText = "Daftar";
    submitBtn.innerText = "DAFTAR";
    this.innerText = "Punya Akun? Masuk";

    extraField.style.display = "block";
    loginFooter.style.display = "none";
    lostPasswordMsg.style.display = "none";
    passwordGroup.style.display = "block";
  } else {
    showLoginMode();
  }
});

lostPasswordLink.addEventListener("click", function (e) {
  e.preventDefault();
  formTitle.innerText = "Lupa kata sandi";
  submitBtn.innerText = "PERBAHARUI KATA SANDI";
  switchForm.innerText = "Masuk";

  lostPasswordMsg.style.display = "block";
  passwordGroup.style.display = "none";
  rememberWrap.style.display = "none";
  this.style.display = "none";
});

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", function () {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  this.classList.toggle("fa-eye-slash");
});
// END LOGIN ICON
// ---------------------------------------------------------------------------------


// SEARCH ICON
const searchForm = document.querySelector(".search-form");
const searchBox = document.querySelector("#search-box");

document.querySelector("#search-button").onclick = (e) => {
  searchForm.classList.toggle("active");
  searchBox.focus();  
  e.preventDefault();
};

document.addEventListener('click', function (e) {
  if (!document.querySelector("#search-button").contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove('active');
  }
});
// END SEARCH ICON
// -------------------------------------------------------------------------------

// SHOPPING CART ICON NAVBAR
const cartSidebar = document.getElementById('cart-sidebar');
const cartButton = document.getElementById('shopping-cart-button');
const closeCart = document.getElementById('close-cart');

function openCart() {
  cartSidebar.classList.add('active');
}

closeCart.addEventListener('click', function() {
  cartSidebar.classList.remove('active');
});

document.addEventListener('click', function (e) {
  if (!cartButton.contains(e.target) && !cartSidebar.contains(e.target)) {
    cartSidebar.classList.remove('active');
  }
});
// END SHOPPING CART ICON NAVBAR
// -----------------------------------------------------------


// SHOW PRODUCT SELL
// Teknik Event Delegation (Memfungsikan Data Atribut Data-X)
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalProduct");
  const closeBtn = document.querySelector(".close-button");
  const body = document.body;

  const modalImg = document.getElementById("photoProduct");
  const modalTitle = document.getElementById("modalTitle");
  const modalPrice = document.getElementById("modalPrice");
  const modalDesc = document.getElementById("productDescription");
  
  document.addEventListener("click", (e) => {
    const btn = e.target.closest('.action-icons button[title="Lihat Detail"]');
    
    if (btn) {
      const card = btn.closest(".card-sellproduct");
      if (!card) return;

      const title = card.getAttribute("data-title");
      const price = card.getAttribute("data-price");
      const img = card.getAttribute("data-img");
      const desc = card.getAttribute("data-desc");

      modalImg.src = img || "";
      modalImg.alt = title || "Produk";
      modalTitle.textContent = title || "Tanpa Nama";
      modalDesc.textContent = desc || "Tidak ada deskripsi.";
      
      if (price) {
        modalPrice.textContent = `Rp ${parseInt(price).toLocaleString("id-ID")}`;
      } else {
        modalPrice.textContent = "Harga tidak tersedia";
      }

      modal.style.display = "flex";
      body.classList.add("no-scroll");
    }
  });

  const closeModal = () => {
    modal.style.display = "none";
    body.classList.remove("no-scroll");
  };

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeModal();
    }
  });
});
// END SHOW PRODUCT SELL 
// -------------------------------------------------------------------------------


// FUNGSI ALERT
window.alert = function () {};

function showCustomAlert(message) {
  const alertBox = document.getElementById("customAlert");
  const alertMessage = document.getElementById("alert-message");

  alertMessage.textContent = message;
  alertBox.style.display = "flex";
}

function closeCustomAlert() {
  document.getElementById("customAlert").style.display = "none";
}
// END ALERT FUNCTION
// ------------------------------------------------------------------


// ADD, REDUCE, DELETE AND SUM
document.addEventListener("alpine:init", () => {
  Alpine.store("cart", {
    items: [],
    totalPrice: 0,

    add(newItem) {
      const index = this.items.findIndex((item) => item.id === newItem.id);

      if (index === -1) {
        this.items = [...this.items, { ...newItem, quantity: 1 }];
        showCustomAlert("Produk berhasil dimasukkan ke keranjang!");
      } else {
        this.items = this.items.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      this.calculateTotal();
    },

    remove(id) {
      this.items = this.items
        .map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);

      this.calculateTotal();
    },

    removeItem(id) {
      this.items = this.items.filter((item) => item.id !== id);
      this.calculateTotal();
    },

    calculateTotal() {
      this.totalPrice = this.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },
  });
});
// END ADD, REDUCE, DELETE AND SUM
// -------------------------------------------------------------------


// FUNGSI DELETE PADA SIDEBAR AGAR TIDAK MENUTUP KETIKA DIKLIK
function handleClickOutsideCart(e) {
  const isClickInsideCart = cartSidebar.contains(e.target);
  const isClickOnButton = cartButton.contains(e.target);

  if (!isClickInsideCart && !isClickOnButton) {
    cartSidebar.classList.remove("active");
  }
}

document.addEventListener("click", handleClickOutsideCart);
// END FUNGSI DELETE PADA SIDEBAR AGAR TIDAK MENUTUP KETIKA DIKLIK
// -----------------------------------------------------------


// FUNGSI SEND KE WA ADMIN
function sendToAdmin() {
  const name = document.getElementById("cust-name").value.trim();
  const email = document.getElementById("cust-email").value.trim();
  const phone = document.getElementById("cust-phone").value.trim();

  const cart = Alpine.store("cart");
  const items = cart.items;
  const total = cart.totalPrice;

  if (!name || !phone) {
    showCustomAlert("Nama dan Nomor WhatsApp wajib diisi!");
    return;
  }

  if (!phone.startsWith("08")) {
    showCustomAlert("Gunakan format nomor Indonesia (contoh: 0812...)");
    return;
  }

  if (items.length === 0) {
    showCustomAlert("Keranjang masih kosong!");
    return;
  }

  const message = encodeURIComponent(`
Halo Admin Kedai TaKen,

Saya ingin memesan:

${items
  .map(
    (item) =>
      `- ${item.title} (${item.quantity}x) = Rp ${(item.price * item.quantity).toLocaleString("id-ID")}`,
  )
  .join("\n")}

Total: Rp ${total.toLocaleString("id-ID")}

Nama: ${name}
No. WA: ${phone}
${email ? `Email: ${email}` : ""}
`);

  const adminNumber = "628212299271";

  const url = `https://wa.me/${adminNumber}?text=${message}`;

  window.open(url, "_blank");

  cart.items = [];
  cart.calculateTotal();

  document.getElementById("cust-name").value = "";
  document.getElementById("cust-email").value = "";
  document.getElementById("cust-phone").value = "";

  showCustomAlert("Pesanan berhasil dikirim ke WhatsApp Admin KedaiTaken!");
}
// END FUNGSI SEND KE WA ADMIN
// ----------------------------------------------------------------------------


// HAMBURGER MENU
const hamburgerIcon = document.querySelector("#hamburgerIcon");
const iconToggle = document.querySelector("#iconToggle");
const hamburgerMenu = document.querySelector("#hamburgerMenuKedai");
const body = document.body; 

const toggleScroll = (isActive) => {
  if (isActive) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "auto";
  }
};

hamburgerIcon.onclick = (e) => {
  e.preventDefault();

  hamburgerMenu.classList.toggle("active");

  const isActive = hamburgerMenu.classList.contains("active");

  if (isActive) {
    iconToggle.classList.remove("fa-bars");
    iconToggle.classList.add("fa-xmark");
  } else {
    iconToggle.classList.remove("fa-xmark");
    iconToggle.classList.add("fa-bars");
  }

  toggleScroll(isActive); 
};

document.addEventListener("click", function (e) {
  if (!hamburgerIcon.contains(e.target) && !hamburgerMenu.contains(e.target)) {
    if (hamburgerMenu.classList.contains("active")) {
      hamburgerMenu.classList.remove("active");
      iconToggle.classList.remove("fa-xmark");
      iconToggle.classList.add("fa-bars");
      toggleScroll(false);
    }
  }
});
// END HAMBURGER MENU
// -------------------------------------------------------------------------------


// SCROLL FADE UP (Parallax)
window.addEventListener("scroll", function () {
  const scrollValue = window.scrollY;
  const heroText = document.querySelector(".hero-content-mask");

  // 1. Efek Parallax: Teks bergerak lebih lambat ke atas (seolah tenggelam)
  // Angka 0.5 berarti teks bergerak setengah kecepatan scroll
  heroText.style.transform = `translateY(${scrollValue * 0.5}px)`;

  // 2. Efek Fade Out: Teks memudar saat mendekati bagian bawah meja
  // Semakin jauh scroll, opacity semakin mendekati 0
  const opacity = 1 - scrollValue / 600;
  heroText.style.opacity = opacity > 0 ? opacity : 0;
});
// SCROLL FADE UP (Parallax)
// -------------------------------------------------------------------------------



// BUTTON BOTTOM-UP
let mybutton = document.getElementById("btnUp");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", 
  });
}
// END BUTTON BOTTOM-UP
// -------------------------------------------------------------------------------