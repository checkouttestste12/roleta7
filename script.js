// ===== ROLETA PROFISSIONAL COM GIRO ULTRA MELHORADO =====

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
    statusText: document.getElementById('status-text'),
    velocidadeBar: document.getElementById('velocidade-bar'),
    resultado: document.getElementById('resultado'),
    toastContainer: document.getElementById('toast-container'),
    particlesBg: document.getElementById('particles-bg'),
    roletaContainer: document.getElementById('roleta-gratis-container'),
    girosPremiosInfo: document.getElementById('giros-premios-info')
};

// Configurações da roleta
const roletaConfig = {
    setores: [
        { premio: 0, texto: 'Vazio', angulo: 0 },
        { premio: 25, texto: 'R$ 25', angulo: 45 },
        { premio: 0, texto: 'Vazio', angulo: 90 },
        { premio: 50, texto: 'R$ 50', angulo: 135 },
        { premio: 0, texto: 'Vazio', angulo: 180 },
        { premio: 75, texto: 'R$ 75', angulo: 225 },
        { premio: 0, texto: 'Vazio', angulo: 270 },
        { premio: 100, texto: 'R$ 100', angulo: 315 }
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
        
        // Sistema de curvas de easing profissionais
        this.curvaAceleracao = 'easeOutExpo';
        this.curvaDesaceleracao = 'easeInOutQuint';
        
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

    easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
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
        this.historico = []; // Histórico de velocidades para suavização avançada
        this.maxHistorico = 10;
    }
    
    aplicarEfeitosVelocidade(velocidade) {
        if (!elements.roleta) return;
        
        // Sistema de suavização com histórico
        this.historico.push(velocidade);
        if (this.historico.length > this.maxHistorico) {
            this.historico.shift();
        }
        
        // Média móvel para suavização ultra avançada
        const velocidadeMedia = this.historico.reduce((a, b) => a + b, 0) / this.historico.length;
        this.ultimaVelocidade = this.lerp(this.ultimaVelocidade, velocidadeMedia, this.transicaoSuave);
        
        const velocidadeNormalizada = Math.min(1, this.ultimaVelocidade / 30);
        
        // Motion blur ultra profissional
        const blur = velocidadeNormalizada * 0.8; // Reduzido para efeito mais sutil
        
        // Brilho mais sutil e profissional
        const brilho = 1 + (velocidadeNormalizada * 0.1);
        
        // Saturação dinâmica mais refinada
        const saturacao = 1 + (velocidadeNormalizada * 0.15);
        
        // Contraste sutil para profundidade
        const contraste = 1 + (velocidadeNormalizada * 0.05);
        
        // Aplicar efeitos com transição ultra suave
        elements.roleta.style.filter = `blur(${blur}px) brightness(${brilho}) saturate(${saturacao}) contrast(${contraste})`;
        
        // Sombra dinâmica mais sofisticada
        const sombra = velocidadeNormalizada * 15;
        const corSombra = `rgba(255, 215, 0, ${velocidadeNormalizada * 0.2})`;
        const sombraSecundaria = `rgba(138, 43, 226, ${velocidadeNormalizada * 0.1})`;
        elements.roleta.style.boxShadow = `
            0 0 ${sombra}px ${corSombra},
            0 0 ${sombra * 2}px ${sombraSecundaria}
        `;
        
        // Efeito de escala sutil para dar sensação de profundidade
        const escala = 1 + (velocidadeNormalizada * 0.02);
        elements.roleta.style.transform = `rotate(${gameState.anguloAtual}deg) scale(${escala})`;
    }
    
    criarParticulasGiroProfissionais() {
        if (!elements.particlesBg) return;
        
        // Partículas mais sofisticadas e menos frequentes
        for (let i = 0; i < 2; i++) {
            const particula = document.createElement('div');
            const tamanho = Math.random() * 2 + 1;
            const cores = [
                'rgba(255, 215, 0, 0.3)',
                'rgba(255, 107, 107, 0.25)',
                'rgba(76, 205, 196, 0.25)',
                'rgba(138, 43, 226, 0.2)',
                'rgba(255, 165, 0, 0.25)'
            ];
            
            particula.style.cssText = `
                position: absolute;
                width: ${tamanho}px;
                height: ${tamanho}px;
                background: ${cores[Math.floor(Math.random() * cores.length)]};
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particulaGiroProfissional 2s ease-out forwards;
                will-change: transform, opacity;
                filter: blur(0.5px);
            `;
            
            elements.particlesBg.appendChild(particula);
            
            setTimeout(() => {
                if (particula.parentNode) {
                    particula.parentNode.removeChild(particula);
                }
            }, 2000);
        }
    }
    
    criarConfetesProfissionais() {
        if (!elements.particlesBg) return;
        
        // Confetes mais elegantes e controlados
        for (let i = 0; i < 25; i++) {
            const confete = document.createElement('div');
            const cores = ['#ffd700', '#ff6b6b', '#4ecdc4', '#9b59b6', '#ff9f43', '#26de81'];
            const formas = ['circle', 'square', 'triangle'];
            const forma = formas[Math.floor(Math.random() * formas.length)];
            
            let estiloForma = '';
            if (forma === 'circle') {
                estiloForma = 'border-radius: 50%;';
            } else if (forma === 'triangle') {
                estiloForma = `
                    width: 0;
                    height: 0;
                    border-left: 3px solid transparent;
                    border-right: 3px solid transparent;
                    border-bottom: 6px solid ${cores[Math.floor(Math.random() * cores.length)]};
                    background: transparent;
                `;
            }
            
            confete.style.cssText = `
                position: absolute;
                width: ${forma === 'triangle' ? '0' : Math.random() * 4 + 2 + 'px'};
                height: ${forma === 'triangle' ? '0' : Math.random() * 4 + 2 + 'px'};
                background: ${forma === 'triangle' ? 'transparent' : cores[Math.floor(Math.random() * cores.length)]};
                ${estiloForma}
                left: ${Math.random() * 100}%;
                top: -10px;
                pointer-events: none;
                animation: confeteFallProfissional ${2 + Math.random() * 2}s ease-out forwards;
                animation-delay: ${Math.random() * 2}s;
                will-change: transform;
            `;
            
            elements.particlesBg.appendChild(confete);
        }
        
        setTimeout(() => {
            const confetes = elements.particlesBg.querySelectorAll('div');
            confetes.forEach(confete => {
                if (confete.style.animation.includes('confeteFallProfissional')) {
                    confete.remove();
                }
            });
        }, 5000);
    }
    
    limparEfeitos() {
        if (elements.roleta) {
            elements.roleta.style.filter = '';
            elements.roleta.style.boxShadow = '';
            elements.roleta.style.transform = `rotate(${gameState.anguloAtual}deg)`;
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
    criarParticulasFundoProfissionais();
    
    // Estado inicial
    gameState.estadoRoleta = ESTADOS_ROLETA.IDLE;
    
    if (elements.statusText) {
        elements.statusText.textContent = 'Pronto para girar com sistema ultra profissional!';
    }
    
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
        
        @keyframes particleFloatProfissional {
            0% {
                transform: translateY(0) rotate(0deg) scale(0.8);
                opacity: 0.2;
            }
            50% {
                opacity: 0.5;
                transform: scale(1);
            }
            100% {
                transform: translateY(-100vh) rotate(360deg) scale(0.6);
                opacity: 0;
            }
        }
        
        /* Melhorar transições da roleta para movimento ultra suave */
        #roleta {
            transition: filter 0.2s ease, box-shadow 0.2s ease;
            will-change: transform, filter;
            transform-origin: center center;
        }
        
        /* Otimizar performance com GPU acceleration */
        .toast {
            will-change: transform;
            transform: translateZ(0);
        }
        
        /* Efeitos de hover mais profissionais */
        button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        button:active {
            transform: translateY(0);
        }
        
        /* Indicador de velocidade mais sofisticado */
        #velocidade-bar {
            transition: width 0.1s ease, background-color 0.2s ease;
            border-radius: 4px;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.2);
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
    
    mostrarToast('A roleta está girando com sistema ultra profissional! Pressione PARAR quando desejar.', 'info');
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
        
        // Atualizar indicadores
        atualizarIndicadoresProfissionais(estadoFisica);
        
        // Som durante o giro
        audioSystem.play('giroLoop', gameState.velocidadeAtual);
        
        // Criar partículas durante o giro (menos frequente para performance)
        if (gameState.velocidadeAtual > 12 && contadorFrames % 8 === 0) {
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
    
    mostrarToast('Comando de parada recebido! A roleta está desacelerando com precisão ultra profissional...', 'warning');
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
    
    // Resetar indicadores
    if (elements.velocidadeBar) {
        elements.velocidadeBar.style.width = '0%';
    }
    
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
            elements.statusText.textContent = 'Pronto para outro giro ultra profissional!';
        }, 4000);
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

// Atualizar indicadores profissionais
function atualizarIndicadoresProfissionais(estadoFisica) {
    // Atualizar status com informações mais detalhadas
    let statusText = '';
    const tempoMinutos = Math.floor(gameState.tempoGiro / 60000);
    const tempoSegundos = Math.floor((gameState.tempoGiro % 60000) / 1000);
    const tempoFormatado = `${tempoMinutos}:${tempoSegundos.toString().padStart(2, '0')}`;
    
    switch (estadoFisica.fase) {
        case 'acelerando':
            statusText = `⚡ Acelerando suavemente... ${estadoFisica.velocidade.toFixed(1)} rpm`;
            break;
        case 'constante':
            statusText = `🌀 Girando fluidamente... ${estadoFisica.velocidade.toFixed(1)} rpm (${tempoFormatado})`;
            break;
        case 'desacelerando':
            statusText = `🎯 Parando com precisão... ${estadoFisica.velocidade.toFixed(1)} rpm`;
            break;
    }
    
    if (elements.statusText) {
        elements.statusText.textContent = statusText;
    }
    
    // Atualizar barra de velocidade com animação ultra suave
    if (elements.velocidadeBar) {
        const porcentagem = (estadoFisica.velocidade / 30) * 100;
        elements.velocidadeBar.style.width = `${Math.min(100, porcentagem)}%`;
        
        // Gradiente de cor mais sofisticado baseado na velocidade
        const hue1 = Math.min(120, (estadoFisica.velocidade / 30) * 120);
        const hue2 = Math.min(60, (estadoFisica.velocidade / 30) * 60);
        elements.velocidadeBar.style.background = `linear-gradient(90deg, hsl(${hue2}, 70%, 50%), hsl(${hue1}, 70%, 50%))`;
    }
}

// Mostrar resultado profissional
function mostrarResultadoProfissional(setor) {
    const isWin = setor.premio > 0;
    
    elements.resultado.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="font-size: 4rem; margin-bottom: 20px; animation: bounce 0.6s ease;">
                ${isWin ? '🎉' : '😔'}
            </div>
            <div style="font-size: 2.5rem; margin-bottom: 15px; color: ${isWin ? '#ffd700' : '#ff6b6b'}; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                ${setor.texto}
            </div>
            <div style="font-size: 1.3rem; opacity: 0.9; color: #333;">
                ${isWin ? '🎊 Parabéns! Você ganhou com o sistema ultra profissional!' : '🔄 Tente novamente com nosso sistema avançado!'}
            </div>
            <div style="font-size: 0.9rem; margin-top: 10px; opacity: 0.7;">
                Resultado determinado com precisão ultra profissional
            </div>
        </div>
    `;
    
    elements.resultado.classList.add('show');
    
    setTimeout(() => {
        elements.resultado.classList.remove('show');
    }, 6000);
}

// ===== FUNÇÕES AUXILIARES ULTRA MELHORADAS =====

// Criar efeito ripple profissional
function criarEfeitoRippleProfissional(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 70%, transparent 100%);
        transform: scale(0);
        animation: rippleProfissional 0.6s ease-out;
        pointer-events: none;
        will-change: transform;
    `;
    
    // Adicionar animação CSS se não existir
    if (!document.querySelector('#ripple-profissional-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-profissional-style';
        style.textContent = `
            @keyframes rippleProfissional {
                to {
                    transform: scale(2.5);
                    opacity: 0;
                }
            }
            
            @keyframes bounce {
                0%, 20%, 53%, 80%, 100% {
                    transform: translate3d(0,0,0);
                }
                40%, 43% {
                    transform: translate3d(0,-15px,0);
                }
                70% {
                    transform: translate3d(0,-7px,0);
                }
                90% {
                    transform: translate3d(0,-2px,0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// Toast notifications profissionais
function mostrarToast(mensagem, tipo = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = mensagem;
    
    const estilos = {
        success: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
        error: 'linear-gradient(135deg, #ff6b6b 0%, #ff5252 100%)',
        warning: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
        info: 'linear-gradient(135deg, #4ecdc4 0%, #26a69a 100%)'
    };
    
    toast.style.background = estilos[tipo] || estilos.info;
    toast.style.color = tipo === 'warning' ? '#0a0e27' : '#ffffff';
    toast.style.willChange = 'transform';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    toast.style.borderRadius = '8px';
    toast.style.padding = '12px 16px';
    toast.style.fontSize = '14px';
    toast.style.fontWeight = '500';
    
    elements.toastContainer.appendChild(toast);
    
    setTimeout(() => toast.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Criar partículas de fundo profissionais
function criarParticulasFundoProfissionais() {
    if (!elements.particlesBg) return;
    
    for (let i = 0; i < 15; i++) { // Reduzido para melhor performance
        const particula = document.createElement('div');
        const tamanho = Math.random() * 3 + 1;
        const cores = [
            'rgba(255, 215, 0, 0.2)',
            'rgba(138, 43, 226, 0.12)',
            'rgba(255, 105, 180, 0.12)',
            'rgba(76, 205, 196, 0.12)',
            'rgba(255, 165, 0, 0.15)'
        ];
        
        particula.style.cssText = `
            position: absolute;
            width: ${tamanho}px;
            height: ${tamanho}px;
            background: ${cores[Math.floor(Math.random() * cores.length)]};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            filter: blur(0.5px);
            animation: particleFloatProfissional ${30 + Math.random() * 25}s linear infinite;
            animation-delay: ${Math.random() * 15}s;
            will-change: transform;
        `;
        
        elements.particlesBg.appendChild(particula);
    }
}

console.log('🎰 RoletaWin Giro Ultra Profissional carregada com sucesso!');

