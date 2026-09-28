/* =========================================================
   Gomes & Cortez Advocacia — scripts do site
   ========================================================= */
(function(){

  
  const whatsappNumero = "5561996106388"; 
  const whatsappMensagem = "Olá! Gostaria de agendar um atendimento.";

  const linkWhats = "https://wa.me/" + whatsappNumero + "?text=" + encodeURIComponent(whatsappMensagem);
  document.querySelectorAll(".link-whatsapp").forEach(function(el){
    el.setAttribute("href", linkWhats);
  });

  
  document.getElementById("anoAtual").textContent = new Date().getFullYear();

 
  const header = document.getElementById("header");
  window.addEventListener("scroll", function(){
    if(window.scrollY > 20){
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    toggleVoltarTopo();
  });

  const menu = document.getElementById("menuPrincipal");
  const btnMenu = document.getElementById("btnMenuMobile");
  const overlay = document.getElementById("overlayMenu");

  function abrirMenu(){
    menu.classList.add("aberto");
    overlay.classList.add("ativo");
    btnMenu.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
    btnMenu.setAttribute("aria-expanded", "true");
    btnMenu.setAttribute("aria-label", "Fechar menu");
  }
  function fecharMenu(){
    menu.classList.remove("aberto");
    overlay.classList.remove("ativo");
    btnMenu.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    btnMenu.setAttribute("aria-expanded", "false");
    btnMenu.setAttribute("aria-label", "Abrir menu");
  }
  btnMenu.addEventListener("click", function(){
    menu.classList.contains("aberto") ? fecharMenu() : abrirMenu();
  });
  overlay.addEventListener("click", fecharMenu);
  document.querySelectorAll(".link-menu").forEach(function(a){
    a.addEventListener("click", fecharMenu);
  });
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && menu.classList.contains("aberto")){
      fecharMenu();
      btnMenu.focus();
    }
  });

  /* =========================================================
     FAQ — abrir/fechar
     ========================================================= */
  document.querySelectorAll(".faq-item").forEach(function(item){
    const pergunta = item.querySelector(".faq-pergunta");
    const resposta = item.querySelector(".faq-resposta");
    pergunta.addEventListener("click", function(){
      const estaAberto = item.classList.contains("aberto");
      document.querySelectorAll(".faq-item").forEach(function(outro){
        outro.classList.remove("aberto");
        outro.querySelector(".faq-resposta").style.maxHeight = null;
        outro.querySelector(".faq-pergunta").setAttribute("aria-expanded", "false");
      });
      if(!estaAberto){
        item.classList.add("aberto");
        resposta.style.maxHeight = resposta.scrollHeight + "px";
        pergunta.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* =========================================================
     ANIMAÇÃO DE ENTRADA AO ROLAR
     ========================================================= */
  const elementosReveal = document.querySelectorAll(".reveal");
  const observador = new IntersectionObserver(function(entradas){
    entradas.forEach(function(entrada){
      if(entrada.isIntersecting){
        entrada.target.classList.add("visivel");
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });
  elementosReveal.forEach(function(el){ observador.observe(el); });

  /* =========================================================
     BOTÃO VOLTAR AO TOPO
     ========================================================= */
  const btnVoltarTopo = document.getElementById("voltarTopo");
  function toggleVoltarTopo(){
    if(window.scrollY > 480){
      btnVoltarTopo.classList.add("visivel");
    } else {
      btnVoltarTopo.classList.remove("visivel");
    }
  }
  btnVoltarTopo.addEventListener("click", function(){
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* =========================================================
     VALIDAÇÃO BÁSICA DO FORMULÁRIO
     ========================================================= */
  const form = document.getElementById("formContato");
  const statusFormulario = document.getElementById("statusFormulario");

  function validarCampo(id, condicao){
    const campo = document.getElementById(id);
    const entrada = campo.querySelector("input, textarea");
    if(condicao){
      campo.classList.remove("invalido");
      entrada.removeAttribute("aria-invalid");
      return true;
    } else {
      campo.classList.add("invalido");
      entrada.setAttribute("aria-invalid", "true");
      return false;
    }
  }

  form.addEventListener("submit", async function(e){
    e.preventDefault();

    statusFormulario.classList.remove("mostrar");
    statusFormulario.style.background = "";
    statusFormulario.style.color = "";
    statusFormulario.style.borderColor = "";

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexTelefone = /[0-9]{8,}/;

    const nomeValido = validarCampo("campoNome", nome.length >= 3);
    const telefoneValido = validarCampo(
      "campoTelefone",
      regexTelefone.test(telefone.replace(/\D/g, ""))
    );
    const emailValido = validarCampo(
      "campoEmail",
      regexEmail.test(email)
    );
    const mensagemValida = validarCampo(
      "campoMensagem",
      mensagem.length >= 10
    );

    if (!(nomeValido && telefoneValido && emailValido && mensagemValida)) {
      const primeiroInvalido = form.querySelector(".invalido");

      if (primeiroInvalido) {
        primeiroInvalido.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
        primeiroInvalido.querySelector("input, textarea").focus({ preventScroll: true });
      }

      return;
    }

    const botao = form.querySelector("button[type='submit']");
    const textoOriginal = botao.textContent;

    botao.disabled = true;
    botao.textContent = "Abrindo o WhatsApp...";

    /* =========================================================
       ENVIO VIA WHATSAPP
       ========================================================= */
    try {
      const textoWhats =
        "Olá! Meu nome é " + nome + "." +
        "\nTelefone: " + telefone +
        "\nE-mail: " + email +
        "\nMensagem: " + mensagem;

      const linkFormWhats =
        "https://wa.me/" + whatsappNumero + "?text=" + encodeURIComponent(textoWhats);

      statusFormulario.textContent =
        "Abrindo o WhatsApp com sua mensagem pronta. É só confirmar o envio por lá.";
      statusFormulario.classList.add("mostrar");

      window.open(linkFormWhats, "_blank", "noopener");
      form.reset();
    } catch (erro) {
      statusFormulario.textContent =
        "Não foi possível abrir o WhatsApp. Tente novamente.";
      statusFormulario.style.background = "rgba(178,59,59,0.1)";
      statusFormulario.style.color = "#b23b3b";
      statusFormulario.style.borderColor = "rgba(178,59,59,0.25)";
      statusFormulario.classList.add("mostrar");
    } finally {
      botao.disabled = false;
      botao.textContent = textoOriginal;
    }
  });

})();
