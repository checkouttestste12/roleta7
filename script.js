// ===== ROLETA PROFISSIONAL COM GIRO ULTRA MELHORADO - VERSÃO SIMPLIFICADA =====

// Estados da máquina de estados da roleta
const ESTADOS_ROLETA = {
    IDLE: 'idle',
    SPINNING: 'spinning',
    STOPPING: 'stopping',
    STOPPED: 'stopped'
};

// Estado do jogo com gerenciamento robusto
let gameState = {
    // Estado da roleta
    estadoRoleta: ESTADOS_ROLETA.IDLE,
    anguloAtual: 0,
    velocidadeAtual: 0,
    tempoGiro: 0,
    
    // Controles de animação
    animacaoId: null,
    
    // Locks para prevenir ações simultâneas
    bloqueado: false,
    podeParar: false
};

// Elementos DOM
const elements = {
    btnGirar: document.getElementById('btn-girar'),
    btnParar: document.getElementById('btn-parar'),
    roleta: document.getElementById('roleta'),
    roletaContainer: document.getElementById('roleta-gratis-container'),
    girosPremiosInfo: document.getElementById('giros-premios-info')
};

// Configurações da roleta simplificada (8 setores como as mesas)
const roletaConfig = {
    setores: [
        { premio: 25, texto: 'R$ 25', angulo: 0, cor: '#ffd700' },
        { premio: 0, texto: 'Vazio', angulo: 45, cor: '#2a2a2a' },
        { premio: 50, texto: 'R$ 50', angulo: 90, cor: '#ff6b6b' },
        { premio: 0, texto: 'Vazio', angulo: 135, cor: '#2a2a2a' },
        { premio: 75, texto: 'R$ 75', angulo: 180, cor: '#4ecdc4' },
        { premio: 0, texto: 'Vazio', angulo: 225, cor: '#2a2a2a' },
        { premio: 25, texto: 'R$ 25', angulo: 270, cor: '#ffd700' },
        { premio: 0, texto: 'Vazio', angulo: 315, cor: '#2a2a2a' }
    ]
};

// ===== SISTEMA DE FÍSICA ULTRA MELHORADO PARA GIRO PROFISSIONAL =====

class FisicaProfissional {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.angulo = 0;
        this.velocidade = 0;
        this.aceleracao = 0;
        this.tempo = 0;
        this.fase = 'idle';
        this.parandoForcado = false;
        
        // Configurações profissionais para giro ultra fluido
        this.tempoAceleracao = 1200; // 1.2s - aceleração mais rápida e responsiva
        this.tempoDesaceleracao = 4000; // 4s - desaceleração mais longa e suave
        this.velocidadeMaxima = 20 + Math.random() * 8; // 20-28 rpm - mais variação
        this.velocidadeMinima = 3; // Velocidade inicial mais alta
        
        // Parâmetros avançados para movimento ultra suave
        this.inercia = 0.985; // Inércia mais alta para movimento mais natural
        this.ruido = 0;
        this.ultimaVelocidade = 0;
        this.momentoAngular = 0; // Novo: momento angular para física mais realista
        this.atrito = 0.998; // Novo: atrito sutil
        
        this.anguloAlvo = 0;
        this.precisaoAlvo = 0.1; // Precisão melhorada para parada
    }

    iniciarGiro() {
        this.reset();
        this.fase = 'acelerando';
        this.velocidade = this.velocidadeMinima;
        this.momentoAngular = this.velocidadeMinima;
        return null;
    }

    pararGiro() {
        if (this.fase === 'acelerando' || this.fase === 'constante') {
            this.parandoForcado = true;
            this.fase = 'desacelerando';
            this.tempo = 0;
            
            // Cálculo ultra preciso do setor alvo com física realista
            const anguloAtual = this.angulo % 360;
            const setorAtual = Math.floor(anguloAtual / 45);
            
            // Algoritmo melhorado para determinar setor alvo
            const energiaCinetica = this.velocidade * this.velocidade;
            const voltasExtras = Math.max(3, Math.min(8, energiaCinetica / 50));
            
            // Variação mais natural baseada na velocidade atual
            const variacao = (Math.random() - 0.5) * (this.velocidade / 10);
            const setoresExtras = Math.floor(Math.random() * 4) + 3; // 3-6 setores extras
            const proximoSetor = (setorAtual + setoresExtras) % 8;
            
            this.anguloAlvo = this.angulo + (voltasExtras * 360) + 
                             (proximoSetor * 45) - (anguloAtual % 360) + variacao;
            
            return proximoSetor;
        }
        return null;
    }

    atualizar(deltaTime) {
        // Normalização ultra precisa do deltaTime
        const dt = Math.min(deltaTime, 20) / 16.67; // Limitado a 20ms para evitar saltos
        this.tempo += deltaTime;
        
        // Sistema de suavização avançado
        this.ultimaVelocidade = this.velocidade;
        
        switch (this.fase) {
            case 'acelerando':
                this.atualizarAceleracaoProfissional(dt);
                break;
            case 'constante':
                this.atualizarConstanteProfissional(dt);
                break;
            case 'desacelerando':
                this.atualizarDesaceleracaoProfissional(dt);
                break;
        }

        // Sistema de suavização ultra avançado com múltiplas camadas
        const fatorSuavizacao = 0.08; // Mais suave que antes
        this.velocidade = this.lerp(this.ultimaVelocidade, this.velocidade, fatorSuavizacao);
        
        // Aplicar atrito sutil para movimento mais realista
        this.velocidade *= this.atrito;
        
        // Sistema de ruído avançado para movimento orgânico
        const ruido1 = Math.sin(this.tempo * 0.002) * 0.15;
        const ruido2 = Math.cos(this.tempo * 0.005) * 0.08;
        const ruido3 = Math.sin(this.tempo * 0.0008) * 0.25;
        this.ruido = ruido1 + ruido2 + ruido3;
        
        // Atualizar momento angular para física mais realista
        this.momentoAngular = this.lerp(this.momentoAngular, this.velocidade, 0.05);
        
        // Atualizar ângulo com movimento ultra suavizado
        const velocidadeFinal = this.momentoAngular + this.ruido;
        this.angulo += velocidadeFinal * dt * 0.55; // Velocidade ligeiramente reduzida para mais controle

        return {
            angulo: this.angulo % 360,
            velocidade: Math.abs(velocidadeFinal),
            fase: this.fase,
            completo: this.fase === 'parado'
        };
    }

    atualizarAceleracaoProfissional(dt) {
        if (this.tempo < this.tempoAceleracao) {
            const progresso = this.tempo / this.tempoAceleracao;
            
            // Curva de aceleração profissional (easeOutExpo)
            const curva = progresso === 1 ? 1 : 1 - Math.pow(2, -10 * progresso);
            
            // Aceleração ultra suave com micro-variações
            const microVariacao = Math.sin(this.tempo * 0.01) * 0.5;
            const velocidadeAlvo = this.velocidadeMinima + 
                                 (this.velocidadeMaxima - this.velocidadeMinima) * curva + microVariacao;
            
            this.velocidade = velocidadeAlvo;
        } else {
            this.fase = 'constante';
            this.velocidade = this.velocidadeMaxima;
        }
    }

    atualizarConstanteProfissional(dt) {
        // Sistema de variação ultra avançado para movimento orgânico
        const variacao1 = Math.sin(this.tempo * 0.0015) * 0.3;
        const variacao2 = Math.cos(this.tempo * 0.004) * 0.15;
        const variacao3 = Math.sin(this.tempo * 0.0008) * 0.4;
        const variacao4 = Math.cos(this.tempo * 0.006) * 0.1; // Nova camada de variação
        
        this.velocidade = this.velocidadeMaxima + variacao1 + variacao2 + variacao3 + variacao4;
        
        // Limites mais estreitos para movimento mais controlado
        this.velocidade = Math.max(this.velocidadeMaxima * 0.85, 
                                  Math.min(this.velocidadeMaxima * 1.15, this.velocidade));
    }

    atualizarDesaceleracaoProfissional(dt) {
        if (this.tempo < this.tempoDesaceleracao) {
            const progresso = this.tempo / this.tempoDesaceleracao;
            
            // Curva de desaceleração ultra profissional (easeInOutQuint)
            const curva = progresso < 0.5 
                ? 16 * progresso * progresso * progresso * progresso * progresso
                : 1 - Math.pow(-2 * progresso + 2, 5) / 2;
            
            // Desaceleração ultra suave
            this.velocidade = this.velocidadeMaxima * (1 - curva);
            
            // Sistema de convergência ultra preciso para ângulo alvo
            if (progresso > 0.3) { // Começar convergência mais cedo
                const fatorConvergencia = (progresso - 0.3) / 0.7;
                const convergencia = this.easeInOutQuint(fatorConvergencia);
                
                const diferenca = this.anguloAlvo - this.angulo;
                const ajuste = diferenca * convergencia * 0.006; // Ajuste mais preciso
                
                this.angulo += ajuste;
            }
            
            // Fase final de precisão ultra alta
            if (progresso > 0.9) {
                const precisao = (progresso - 0.9) / 0.1;
                const diferenca = this.anguloAlvo - this.angulo;
                if (Math.abs(diferenca) < 5) { // Dentro de 5 graus
                    this.angulo += diferenca * precisao * 0.3;
                }
            }
        } else {
            this.fase = 'parado';
            this.velocidade = 0;
            this.angulo = this.anguloAlvo;
        }
    }

    // Funções de easing profissionais
    lerp(a, b, t) {
        return a + (b - a) * t;
    }

    easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    easeInOutQuint(t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
    }
}

// ===== SISTEMA DE ÁUDIO PROFISSIONAL =====

class AudioSystemProfissional {
    constructor() {
        this.context = null;
        this.masterGain = null;
        this.volume = 0.2; // Volume mais baixo para experiência profissional
        this.muted = false;
        this.init();
    }
    
    async init() {
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.context.createGain();
            this.masterGain.connect(this.context.destination);
            this.masterGain.gain.value = this.volume;
        } catch (e) {
            console.log('❌ Áudio não suportado:', e);
        }
    }
    
    play(type, velocidade = 1) {
        if (!this.context || this.muted) return;
        
        const agora = this.context.currentTime;
        
        switch (type) {
            case 'giroInicio':
                this.playGiroInicioProfissional(agora);
                break;
            case 'giroLoop':
                this.playGiroLoopProfissional(agora, velocidade);
                break;
            case 'parada':
                this.playParadaProfissional(agora);
                break;
            case 'vitoria':
                this.playVitoriaProfissional(agora);
                break;
        }
    }
    
    playGiroInicioProfissional(agora) {
        // Som de início mais sofisticado
        const oscillator1 = this.context.createOscillator();
        const oscillator2 = this.context.createOscillator();
        const gainNode = this.context.createGain();
        
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        // Harmônicos para som mais rico
        oscillator1.frequency.setValueAtTime(200, agora);
        oscillator1.frequency.exponentialRampToValueAtTime(400, agora + 0.4);
        oscillator1.type = 'sine';
        
        oscillator2.frequency.setValueAtTime(300, agora);
        oscillator2.frequency.exponentialRampToValueAtTime(600, agora + 0.4);
        oscillator2.type = 'triangle';
        
        gainNode.gain.setValueAtTime(0.06, agora);
        gainNode.gain.exponentialRampToValueAtTime(0.001, agora + 0.8);
        
        oscillator1.start(agora);
        oscillator1.stop(agora + 0.8);
        oscillator2.start(agora);
        oscillator2.stop(agora + 0.8);
    }
    
    playGiroLoopProfissional(agora, velocidade) {
        // Som mais sutil e profissional durante o giro
        if (Math.random() < 0.08) { // 8% de chance por frame
            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();
            const filter = this.context.createBiquadFilter();
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.masterGain);
            
            const freq = 120 + (velocidade * 3);
            oscillator.frequency.value = freq;
            oscillator.type = 'sawtooth';
            
            // Filtro passa-baixa para som mais suave
            filter.type = 'lowpass';
            filter.frequency.value = 800;
            filter.Q.value = 1;
            
            const volume = Math.min(0.02, velocidade * 0.001);
            gainNode.gain.setValueAtTime(volume, agora);
            gainNode.gain.exponentialRampToValueAtTime(0.001, agora + 0.15);
            
            oscillator.start(agora);
            oscillator.stop(agora + 0.15);
        }
    }
    
    playParadaProfissional(agora) {
        // Som de parada mais elaborado e profissional
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        const filter = this.context.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        oscillator.frequency.setValueAtTime(400, agora);
        oscillator.frequency.exponentialRampToValueAtTime(150, agora + 1.5);
        oscillator.type = 'sine';
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, agora);
        filter.frequency.exponentialRampToValueAtTime(200, agora + 1.5);
        
        gainNode.gain.setValueAtTime(0.05, agora);
        gainNode.gain.exponentialRampToValueAtTime(0.001, agora + 1.5);
        
        oscillator.start(agora);
        oscillator.stop(agora + 1.5);
    }
    
    playVitoriaProfissional(agora) {
        // Sequência melódica mais elaborada e profissional
        const acordeVitoria = [
            [261.63, 329.63, 392.00], // C4, E4, G4 (acorde C maior)
            [293.66, 369.99, 440.00], // D4, F#4, A4 (acorde D maior)
            [329.63, 415.30, 493.88], // E4, G#4, B4 (acorde E maior)
            [523.25, 659.25, 783.99]  // C5, E5, G5 (acorde C maior oitava)
        ];
        
        acordeVitoria.forEach((acorde, i) => {
            acorde.forEach((freq, j) => {
                const osc = this.context.createOscillator();
                const gain = this.context.createGain();
                
                osc.connect(gain);
                gain.connect(this.masterGain);
                
                osc.frequency.value = freq;
                osc.type = 'sine';
                
                const startTime = agora + i * 0.25;
                const volume = 0.03 / (j + 1); // Volume decrescente para harmônicos
                gain.gain.setValueAtTime(volume, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
                
                osc.start(startTime);
                osc.stop(startTime + 0.4);
            });
        });
    }
}

// ===== SISTEMA DE EFEITOS VISUAIS PROFISSIONAIS =====

class EfeitosVisuaisProfissionais {
    constructor() {
        this.ultimaVelocidade = 0;
        this.transicaoSuave = 0.08; // Transição mais suave
    }
    
    aplicarEfeitosVelocidade(velocidade) {
        if (!elements.roleta) return;
        
        // Suavizar transições de velocidade
        this.ultimaVelocidade = this.lerp(this.ultimaVelocidade, velocidade, this.transicaoSuave);
        
        // Aplicar efeitos baseados na velocidade suavizada
        const intensidade = Math.min(1, this.ultimaVelocidade / 25);
        
        // Efeito de brilho mais sutil
        const brilho = 0.3 + (intensidade * 0.7);
        const blur = intensidade * 2;
        const saturacao = 1 + (intensidade * 0.5);
        
        elements.roleta.style.filter = `brightness(${brilho}) blur(${blur}px) saturate(${saturacao})`;
        
        // Adicionar/remover classe de giro
        if (velocidade > 5) {
            elements.roleta.classList.add('girando');
            if (elements.roletaContainer) {
                elements.roletaContainer.classList.add('girando');
            }
        } else {
            elements.roleta.classList.remove('girando');
            if (elements.roletaContainer) {
                elements.roletaContainer.classList.remove('girando');
            }
        }
    }
    
    criarParticulasGiroProfissionais() {
        // Criar partículas mais sutis durante o giro
        for (let i = 0; i < 3; i++) {
            const particula = document.createElement('div');
            particula.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #ffd700;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: particulaGiroProfissional 1s ease-out forwards;
                z-index: 1000;
            `;
            
            document.body.appendChild(particula);
            
            setTimeout(() => {
                if (particula.parentNode) {
                    particula.parentNode.removeChild(particula);
                }
            }, 1000);
        }
    }
    
    criarConfetesProfissionais() {
        // Confetes mais elegantes e controlados
        for (let i = 0; i < 15; i++) {
            const confete = document.createElement('div');
            const cores = ['#ffd700', '#ff6b6b', '#4ecdc4', '#9b59b6', '#ff9f43', '#26de81'];
            
            confete.style.cssText = `
                position: fixed;
                width: ${Math.random() * 6 + 3}px;
                height: ${Math.random() * 6 + 3}px;
                background: ${cores[Math.floor(Math.random() * cores.length)]};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: -10px;
                pointer-events: none;
                animation: confeteFallProfissional ${2 + Math.random() * 2}s ease-out forwards;
                animation-delay: ${Math.random() * 1}s;
                z-index: 10000;
            `;
            
            document.body.appendChild(confete);
        }
        
        setTimeout(() => {
            const confetes = document.querySelectorAll('div');
            confetes.forEach(confete => {
                if (confete.style.animation && confete.style.animation.includes('confeteFallProfissional')) {
                    confete.remove();
                }
            });
        }, 4000);
    }
    
    limparEfeitos() {
        if (elements.roleta) {
            elements.roleta.style.filter = '';
            elements.roleta.classList.remove('girando');
        }
        if (elements.roletaContainer) {
            elements.roletaContainer.classList.remove('girando');
        }
    }
    
    lerp(a, b, t) {
        return a + (b - a) * t;
    }
}

// ===== INSTÂNCIAS DOS SISTEMAS PROFISSIONAIS =====
const fisica = new FisicaProfissional();
const audioSystem = new AudioSystemProfissional();
const efeitos = new EfeitosVisuaisProfissionais();

// ===== FUNÇÕES PRINCIPAIS ULTRA MELHORADAS =====

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎰 Inicializando RoletaWin Giro Ultra Profissional...');
    
    // Verificar se todos os elementos existem
    const elementosObrigatorios = ['btnGirar', 'btnParar', 'roleta'];
    const elementosFaltando = elementosObrigatorios.filter(id => !elements[id]);
    
    if (elementosFaltando.length > 0) {
        console.error('❌ Elementos obrigatórios não encontrados:', elementosFaltando);
        return;
    }
    
    // Inicializar sistemas
    inicializarEstilosProfissionais();
    inicializarEventListeners();
    
    // Estado inicial
    gameState.estadoRoleta = ESTADOS_ROLETA.IDLE;
    
    console.log('✅ RoletaWin Giro Ultra Profissional inicializada com sucesso!');
});

// Adicionar estilos CSS profissionais
function inicializarEstilosProfissionais() {
    const style = document.createElement('style');
    style.textContent = `
        /* Animações profissionais para partículas */
        @keyframes particulaGiroProfissional {
            0% {
                transform: translateY(0) scale(0) rotate(0deg);
                opacity: 0;
            }
            20% {
                opacity: 1;
            }
            100% {
                transform: translateY(-60px) scale(1.2) rotate(720deg);
                opacity: 0;
            }
        }
        
        @keyframes confeteFallProfissional {
            0% {
                transform: translateY(0) rotate(0deg) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(1080deg) scale(0.8);
                opacity: 0;
            }
        }
        
        /* Melhorar transições da roleta para movimento ultra suave */
        #roleta {
            transition: filter 0.2s ease;
            will-change: transform, filter;
            transform-origin: center center;
        }
        
        /* Efeitos de hover mais profissionais */
        button:hover {
            transform: translateY(-1px);
        }
        
        button:active {
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Inicializar event listeners
function inicializarEventListeners() {
    if (!elements.btnGirar || !elements.btnParar) {
        console.error('❌ Elementos de botão não encontrados');
        return;
    }
    
    elements.btnGirar.addEventListener('click', (e) => {
        criarEfeitoRippleProfissional(e, elements.btnGirar);
        handleGirarClick();
    });
    
    elements.btnParar.addEventListener('click', (e) => {
        criarEfeitoRippleProfissional(e, elements.btnParar);
        handlePararClick();
    });
    
    // Eventos de teclado melhorados
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !gameState.bloqueado) {
            e.preventDefault();
            if (gameState.estadoRoleta === ESTADOS_ROLETA.IDLE) {
                handleGirarClick();
            } else if (gameState.estadoRoleta === ESTADOS_ROLETA.SPINNING) {
                handlePararClick();
            }
        }
        
        // Tecla ESC para parar emergencial
        if (e.code === 'Escape' && gameState.estadoRoleta === ESTADOS_ROLETA.SPINNING) {
            handlePararClick();
        }
    });
}

// Criar efeito ripple nos botões
function criarEfeitoRippleProfissional(event, elemento) {
    const rect = elemento.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    elemento.style.position = 'relative';
    elemento.style.overflow = 'hidden';
    elemento.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Handle click no botão girar
function handleGirarClick() {
    if (gameState.bloqueado || gameState.estadoRoleta !== ESTADOS_ROLETA.IDLE) {
        return;
    }
    
    iniciarGiroUltraProfissional();
}

// Handle click no botão parar
function handlePararClick() {
    if (gameState.bloqueado || gameState.estadoRoleta !== ESTADOS_ROLETA.SPINNING) {
        return;
    }
    
    pararGiroUltraProfissional();
}

// ===== FUNÇÃO PRINCIPAL: INICIAR GIRO ULTRA PROFISSIONAL =====
function iniciarGiroUltraProfissional() {
    if (gameState.bloqueado) return;
    
    console.log('🎯 Iniciando giro ultra profissional');
    
    // Bloquear ações e definir estado
    gameState.bloqueado = true;
    gameState.estadoRoleta = ESTADOS_ROLETA.SPINNING;
    gameState.tempoGiro = 0;
    gameState.podeParar = false;
    
    // Resetar física
    fisica.reset();
    fisica.angulo = gameState.anguloAtual;
    fisica.iniciarGiro();
    
    // Atualizar interface
    trocarBotoes(true);
    
    // Efeitos
    audioSystem.play('giroInicio');
    
    // Iniciar loop de animação ultra profissional
    iniciarLoopAnimacaoUltraProfissional();
    
    mostrarToast('A roleta está girando! Pressione PARAR quando desejar.', 'info');
}

// ===== LOOP DE ANIMAÇÃO ULTRA PROFISSIONAL =====
function iniciarLoopAnimacaoUltraProfissional() {
    let ultimoTempo = performance.now();
    let contadorFrames = 0;
    
    function loop(tempoAtual) {
        if (gameState.estadoRoleta === ESTADOS_ROLETA.STOPPED) {
            return; // Parar loop
        }
        
        const deltaTime = tempoAtual - ultimoTempo;
        ultimoTempo = tempoAtual;
        contadorFrames++;
        
        // Atualizar tempo de giro
        gameState.tempoGiro += deltaTime;
        
        // Atualizar física
        const estadoFisica = fisica.atualizar(deltaTime);
        
        // Atualizar estado do jogo
        gameState.anguloAtual = estadoFisica.angulo;
        gameState.velocidadeAtual = estadoFisica.velocidade;
        
        // Aplicar rotação com transform ultra otimizado
        if (elements.roleta) {
            // Usar transform3d para aceleração por GPU
            elements.roleta.style.transform = `translate3d(0,0,0) rotate(${gameState.anguloAtual}deg)`;
        }
        
        // Efeitos visuais profissionais baseados na velocidade
        efeitos.aplicarEfeitosVelocidade(gameState.velocidadeAtual);
        
        // Som durante o giro
        audioSystem.play('giroLoop', gameState.velocidadeAtual);
        
        // Criar partículas durante o giro (menos frequente para performance)
        if (gameState.velocidadeAtual > 12 && contadorFrames % 15 === 0) {
            efeitos.criarParticulasGiroProfissionais();
        }
        
        // Habilitar botão parar após aceleração
        if (estadoFisica.fase === 'constante' && !gameState.podeParar) {
            gameState.podeParar = true;
            elements.btnParar.disabled = false;
            mostrarToast('Agora você pode parar a roleta!', 'success');
        }
        
        // Verificar se terminou
        if (estadoFisica.completo) {
            finalizarGiroUltraProfissional();
            return;
        }
        
        // Continuar loop
        gameState.animacaoId = requestAnimationFrame(loop);
    }
    
    gameState.animacaoId = requestAnimationFrame(loop);
}

// ===== PARAR GIRO ULTRA PROFISSIONAL =====
function pararGiroUltraProfissional() {
    if (gameState.estadoRoleta !== ESTADOS_ROLETA.SPINNING || !gameState.podeParar) {
        return;
    }
    
    console.log('🛑 Parando giro ultra profissional');
    
    gameState.estadoRoleta = ESTADOS_ROLETA.STOPPING;
    
    // Iniciar desaceleração
    const setorAlvo = fisica.pararGiro();
    gameState.setorAlvo = setorAlvo;
    
    // Atualizar interface
    elements.btnParar.disabled = true;
    
    mostrarToast('Comando de parada recebido! A roleta está desacelerando...', 'warning');
}

// ===== FINALIZAR GIRO ULTRA PROFISSIONAL =====
function finalizarGiroUltraProfissional() {
    console.log('🏁 Finalizando giro ultra profissional');
    
    // Atualizar estado
    gameState.estadoRoleta = ESTADOS_ROLETA.STOPPED;
    gameState.bloqueado = false;
    
    // Limpar animações
    if (gameState.animacaoId) {
        cancelAnimationFrame(gameState.animacaoId);
        gameState.animacaoId = null;
    }
    
    // Limpar efeitos visuais gradualmente
    setTimeout(() => {
        efeitos.limparEfeitos();
    }, 800);
    
    // Som de parada
    audioSystem.play('parada');
    
    // Calcular resultado final com precisão ultra alta
    const anguloFinal = (360 - (gameState.anguloAtual % 360)) % 360;
    const setorIndex = Math.floor(anguloFinal / 45);
    const setorResultado = roletaConfig.setores[setorIndex];
    
    gameState.velocidadeAtual = 0;
    
    // Resetar estado da roleta
    gameState.estadoRoleta = ESTADOS_ROLETA.IDLE;
    
    // Mostrar resultado com delay
    setTimeout(() => {
        if (setorResultado.premio > 0) {
            efeitos.criarConfetesProfissionais();
            audioSystem.play('vitoria');
        }
        
        mostrarResultadoProfissional(setorResultado);
        
        // Resetar para próximo giro
        setTimeout(() => {
            trocarBotoes(false);
        }, 3000);
    }, 1000);
}

// ===== FUNÇÕES DE INTERFACE ULTRA MELHORADAS =====

// Trocar botões
function trocarBotoes(girando) {
    if (!elements.btnGirar || !elements.btnParar) return;
    
    if (girando) {
        elements.btnGirar.classList.add('hidden');
        elements.btnParar.classList.remove('hidden');
        elements.btnParar.disabled = true; // Será habilitado após aceleração
    } else {
        elements.btnParar.classList.add('hidden');
        elements.btnGirar.classList.remove('hidden');
    }
}

// Mostrar resultado profissional
function mostrarResultadoProfissional(setor) {
    const isWin = setor.premio > 0;
    
    // Criar modal de resultado
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #1a1f3a 0%, #2d1b69 100%);
            padding: 3rem;
            border-radius: 20px;
            text-align: center;
            border: 2px solid ${isWin ? '#ffd700' : '#ff6b6b'};
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: slideIn 0.5s ease;
        ">
            <div style="font-size: 4rem; margin-bottom: 1rem;">
                ${isWin ? '🎉' : '😔'}
            </div>
            <div style="
                font-size: 2.5rem; 
                margin-bottom: 1rem; 
                color: ${isWin ? '#ffd700' : '#ff6b6b'}; 
                font-weight: bold; 
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                font-family: 'Orbitron', monospace;
            ">
                ${setor.texto}
            </div>
            <div style="
                font-size: 1.3rem; 
                color: #ffffff; 
                margin-bottom: 2rem;
            ">
                ${isWin ? '🎊 Parabéns! Você ganhou!' : '🔄 Tente novamente!'}
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
                color: #0a0e27;
                border: none;
                padding: 1rem 2rem;
                border-radius: 10px;
                font-weight: 600;
                cursor: pointer;
                font-size: 1.1rem;
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                CONTINUAR
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Remover modal automaticamente após 5 segundos
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 5000);
}

// Mostrar toast
function mostrarToast(mensagem, tipo = 'info') {
    const toast = document.createElement('div');
    const cores = {
        info: '#3498db',
        success: '#2ecc71',
        warning: '#f39c12',
        error: '#e74c3c'
    };
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${cores[tipo]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;
    
    toast.textContent = mensagem;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

// Adicionar animações CSS
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideIn {
        from { transform: translateY(-50px) scale(0.9); opacity: 0; }
        to { transform: translateY(0) scale(1); opacity: 1; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }
    
    @keyframes ripple {
        to { transform: scale(4); opacity: 0; }
    }
`;
document.head.appendChild(animationStyle);

