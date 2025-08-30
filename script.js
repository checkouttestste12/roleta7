// ===== ROLETA PROFISSIONAL COM GIRO ULTRA FLUIDO E HARMÔNICO =====

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
    podeParar: false,
    
    // Performance tracking
    fps: 60,
    ultimoFrame: 0
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

// ===== SISTEMA DE FÍSICA ULTRA FLUIDO PARA GIRO HARMÔNICO =====

class FisicaUltraFluida {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.angulo = 0;
        this.velocidade = 0;
        this.velocidadeAlvo = 0;
        this.aceleracao = 0;
        this.tempo = 0;
        this.fase = 'idle';
        this.parandoForcado = false;
        
        // Configurações ultra fluidas para movimento harmônico
        this.tempoAceleracao = 2000; // 2s - aceleração mais longa e suave
        this.tempoDesaceleracao = 4500; // 4.5s - desaceleração ultra suave
        this.velocidadeMaxima = 12 + Math.random() * 4; // 12-16 rpm - mais suave
        this.velocidadeMinima = 1.5; // Velocidade inicial muito suave
        
        // Parâmetros ultra fluidos para movimento harmônico
        this.suavizacao = 0.08; // Suavização mais sutil
        this.atrito = 0.9998; // Atrito quase imperceptível
        this.inercia = 0.98; // Inércia alta para movimento natural
        
        // Sistema de interpolação ultra avançado
        this.historico = [];
        this.maxHistorico = 8; // Mais histórico para suavização
        this.buffer = [];
        this.maxBuffer = 3;
        
        // Sistema de ondas harmônicas
        this.frequenciaBase = 0.0008; // Frequência base muito baixa
        this.amplitudeBase = 0.15; // Amplitude sutil
        this.harmonicos = [
            { freq: 1, amp: 1.0 },     // Fundamental
            { freq: 2, amp: 0.3 },     // Segunda harmônica
            { freq: 3, amp: 0.1 },     // Terceira harmônica
            { freq: 0.5, amp: 0.2 }    // Sub-harmônica
        ];
        
        this.anguloAlvo = 0;
        this.precisaoAlvo = 0.3; // Precisão ainda mais relaxada
    }

    iniciarGiro() {
        this.reset();
        this.fase = 'acelerando';
        this.velocidade = this.velocidadeMinima;
        this.velocidadeAlvo = this.velocidadeMaxima;
        return null;
    }

    pararGiro() {
        if (this.fase === 'acelerando' || this.fase === 'constante') {
            this.parandoForcado = true;
            this.fase = 'desacelerando';
            this.tempo = 0;
            
            // Cálculo ultra suave do setor alvo
            const anguloAtual = this.angulo % 360;
            const setorAtual = Math.floor(anguloAtual / 45);
            
            // Algoritmo harmônico para determinar setor alvo
            const voltasExtras = 2 + Math.random() * 2; // 2-4 voltas (mais suave)
            const setoresExtras = Math.floor(Math.random() * 2) + 1; // 1-2 setores extras
            const proximoSetor = (setorAtual + setoresExtras) % 8;
            
            this.anguloAlvo = this.angulo + (voltasExtras * 360) + 
                             (proximoSetor * 45) - (anguloAtual % 360);
            
            return proximoSetor;
        }
        return null;
    }

    atualizar(deltaTime) {
        // Normalização ultra robusta do deltaTime
        const dt = Math.min(Math.max(deltaTime, 12), 24) / 16.67; // Entre 12-24ms
        this.tempo += deltaTime;
        
        // Atualizar buffer de velocidade para ultra suavização
        this.buffer.push(this.velocidade);
        if (this.buffer.length > this.maxBuffer) {
            this.buffer.shift();
        }
        
        // Atualizar histórico para suavização avançada
        this.historico.push(this.velocidade);
        if (this.historico.length > this.maxHistorico) {
            this.historico.shift();
        }
        
        // Calcular velocidade média ponderada
        let velocidadeMedia = 0;
        let pesoTotal = 0;
        for (let i = 0; i < this.historico.length; i++) {
            const peso = (i + 1) / this.historico.length; // Peso crescente
            velocidadeMedia += this.historico[i] * peso;
            pesoTotal += peso;
        }
        velocidadeMedia /= pesoTotal;
        
        switch (this.fase) {
            case 'acelerando':
                this.atualizarAceleracaoHarmonica(dt);
                break;
            case 'constante':
                this.atualizarConstanteHarmonica(dt);
                break;
            case 'desacelerando':
                this.atualizarDesaceleracaoHarmonica(dt);
                break;
        }

        // Sistema de suavização ultra avançado com múltiplas camadas
        const velocidadeBuffer = this.buffer.reduce((a, b) => a + b, 0) / this.buffer.length;
        const velocidadeFinal = this.lerp(velocidadeMedia, this.velocidadeAlvo, this.suavizacao);
        this.velocidade = this.lerp(velocidadeFinal, velocidadeBuffer, 0.3);
        
        // Aplicar atrito ultra sutil
        this.velocidade *= this.atrito;
        
        // Atualizar ângulo com movimento ultra suavizado
        this.angulo += this.velocidade * dt * 0.65; // Velocidade ainda mais controlada

        return {
            angulo: this.angulo % 360,
            velocidade: Math.abs(this.velocidade),
            fase: this.fase,
            completo: this.fase === 'parado'
        };
    }

    atualizarAceleracaoHarmonica(dt) {
        if (this.tempo < this.tempoAceleracao) {
            const progresso = this.tempo / this.tempoAceleracao;
            
            // Curva de aceleração ultra suave (easeOutQuart)
            const curva = 1 - Math.pow(1 - progresso, 4);
            
            // Adicionar variação harmônica sutil
            const variacao = this.calcularVariacaoHarmonica() * 0.1;
            
            this.velocidadeAlvo = this.velocidadeMinima + 
                                (this.velocidadeMaxima - this.velocidadeMinima) * curva + variacao;
        } else {
            this.fase = 'constante';
            this.velocidadeAlvo = this.velocidadeMaxima;
        }
    }

    atualizarConstanteHarmonica(dt) {
        // Sistema de variação harmônica ultra avançado
        const variacao = this.calcularVariacaoHarmonica();
        this.velocidadeAlvo = this.velocidadeMaxima + variacao;
        
        // Limites ultra estreitos para movimento consistente
        this.velocidadeAlvo = Math.max(this.velocidadeMaxima * 0.98, 
                                     Math.min(this.velocidadeMaxima * 1.02, this.velocidadeAlvo));
    }

    atualizarDesaceleracaoHarmonica(dt) {
        if (this.tempo < this.tempoDesaceleracao) {
            const progresso = this.tempo / this.tempoDesaceleracao;
            
            // Curva de desaceleração ultra suave (easeInQuart)
            const curva = progresso * progresso * progresso * progresso;
            
            this.velocidadeAlvo = this.velocidadeMaxima * (1 - curva);
            
            // Sistema de convergência ultra suave para ângulo alvo
            if (progresso > 0.4) {
                const fatorConvergencia = (progresso - 0.4) / 0.6;
                const convergencia = this.easeInOutQuart(fatorConvergencia);
                
                const diferenca = this.anguloAlvo - this.angulo;
                const ajuste = diferenca * convergencia * 0.002; // Ajuste ultra sutil
                
                this.angulo += ajuste;
            }
            
            // Fase final de precisão ultra alta
            if (progresso > 0.95) {
                const precisao = (progresso - 0.95) / 0.05;
                const diferenca = this.anguloAlvo - this.angulo;
                if (Math.abs(diferenca) < 3) { // Dentro de 3 graus
                    this.angulo += diferenca * precisao * 0.2;
                }
            }
        } else {
            this.fase = 'parado';
            this.velocidadeAlvo = 0;
            this.velocidade = 0;
            this.angulo = this.anguloAlvo;
        }
    }

    // Calcular variação harmônica complexa
    calcularVariacaoHarmonica() {
        let variacao = 0;
        
        for (const harmonico of this.harmonicos) {
            const freq = this.frequenciaBase * harmonico.freq;
            const amp = this.amplitudeBase * harmonico.amp;
            variacao += Math.sin(this.tempo * freq) * amp;
        }
        
        return variacao;
    }

    // Funções de easing ultra suaves
    lerp(a, b, t) {
        return a + (b - a) * Math.min(t, 1);
    }

    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    easeInQuart(t) {
        return t * t * t * t;
    }

    easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    }
}

// ===== SISTEMA DE ÁUDIO ULTRA HARMÔNICO =====

class AudioSystemHarmonico {
    constructor() {
        this.context = null;
        this.masterGain = null;
        this.volume = 0.12; // Volume ainda mais baixo
        this.muted = false;
        this.ultimoSom = 0;
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
        
        // Throttle ainda mais agressivo para suavidade
        if (type === 'giroLoop' && agora - this.ultimoSom < 0.15) return;
        this.ultimoSom = agora;
        
        switch (type) {
            case 'giroInicio':
                this.playGiroInicioHarmonico(agora);
                break;
            case 'giroLoop':
                this.playGiroLoopHarmonico(agora, velocidade);
                break;
            case 'parada':
                this.playParadaHarmonica(agora);
                break;
            case 'vitoria':
                this.playVitoriaHarmonica(agora);
                break;
        }
    }
    
    playGiroInicioHarmonico(agora) {
        // Som de início ultra suave e harmônico
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        const filter = this.context.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        oscillator.frequency.setValueAtTime(200, agora);
        oscillator.frequency.exponentialRampToValueAtTime(350, agora + 0.8);
        oscillator.type = 'sine';
        
        // Filtro passa-baixa para suavidade
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, agora);
        filter.frequency.exponentialRampToValueAtTime(400, agora + 0.8);
        filter.Q.value = 0.5;
        
        gainNode.gain.setValueAtTime(0.03, agora);
        gainNode.gain.exponentialRampToValueAtTime(0.001, agora + 0.8);
        
        oscillator.start(agora);
        oscillator.stop(agora + 0.8);
    }
    
    playGiroLoopHarmonico(agora, velocidade) {
        // Som ultra sutil durante o giro
        if (Math.random() < 0.03) { // 3% de chance por frame
            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();
            const filter = this.context.createBiquadFilter();
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.masterGain);
            
            const freq = 80 + (velocidade * 1.5);
            oscillator.frequency.value = freq;
            oscillator.type = 'sine';
            
            // Filtro para suavidade extrema
            filter.type = 'lowpass';
            filter.frequency.value = 300;
            filter.Q.value = 0.3;
            
            const volume = Math.min(0.008, velocidade * 0.0003);
            gainNode.gain.setValueAtTime(volume, agora);
            gainNode.gain.exponentialRampToValueAtTime(0.001, agora + 0.08);
            
            oscillator.start(agora);
            oscillator.stop(agora + 0.08);
        }
    }
    
    playParadaHarmonica(agora) {
        // Som de parada ultra harmônico
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        const filter = this.context.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        oscillator.frequency.setValueAtTime(300, agora);
        oscillator.frequency.exponentialRampToValueAtTime(100, agora + 1.5);
        oscillator.type = 'sine';
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, agora);
        filter.frequency.exponentialRampToValueAtTime(150, agora + 1.5);
        filter.Q.value = 0.4;
        
        gainNode.gain.setValueAtTime(0.025, agora);
        gainNode.gain.exponentialRampToValueAtTime(0.001, agora + 1.5);
        
        oscillator.start(agora);
        oscillator.stop(agora + 1.5);
    }
    
    playVitoriaHarmonica(agora) {
        // Sequência melódica ultra harmônica
        const acordes = [
            [261.63, 329.63], // C4, E4
            [293.66, 369.99], // D4, F#4
            [329.63, 415.30], // E4, G#4
            [392.00, 493.88]  // G4, B4
        ];
        
        acordes.forEach((acorde, i) => {
            acorde.forEach((freq, j) => {
                const osc = this.context.createOscillator();
                const gain = this.context.createGain();
                const filter = this.context.createBiquadFilter();
                
                osc.connect(filter);
                filter.connect(gain);
                gain.connect(this.masterGain);
                
                osc.frequency.value = freq;
                osc.type = 'sine';
                
                filter.type = 'lowpass';
                filter.frequency.value = 1000;
                filter.Q.value = 0.3;
                
                const startTime = agora + i * 0.3;
                const volume = 0.015 / (j + 1);
                gain.gain.setValueAtTime(volume, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);
                
                osc.start(startTime);
                osc.stop(startTime + 0.5);
            });
        });
    }
}

// ===== SISTEMA DE EFEITOS VISUAIS ULTRA HARMÔNICOS =====

class EfeitosVisuaisHarmonicos {
    constructor() {
        this.ultimaVelocidade = 0;
        this.transicaoSuave = 0.06; // Transição ultra suave
        this.ultimoEfeito = 0;
        this.brilhoBase = 1;
        this.saturacaoBase = 1;
    }
    
    aplicarEfeitosVelocidade(velocidade) {
        if (!elements.roleta) return;
        
        // Throttle ultra agressivo para máxima suavidade
        const agora = performance.now();
        if (agora - this.ultimoEfeito < 80) return; // Máximo 12.5 FPS para efeitos
        this.ultimoEfeito = agora;
        
        // Suavizar transições de velocidade ultra gradualmente
        this.ultimaVelocidade = this.lerp(this.ultimaVelocidade, velocidade, this.transicaoSuave);
        
        // Aplicar efeitos ultra sutis baseados na velocidade suavizada
        const intensidade = Math.min(1, this.ultimaVelocidade / 16);
        
        // Efeitos extremamente sutis e harmônicos
        this.brilhoBase = this.lerp(this.brilhoBase, 1 + (intensidade * 0.2), 0.05);
        this.saturacaoBase = this.lerp(this.saturacaoBase, 1 + (intensidade * 0.15), 0.05);
        
        elements.roleta.style.filter = `brightness(${this.brilhoBase}) saturate(${this.saturacaoBase})`;
        
        // Adicionar/remover classe de giro com transição suave
        if (velocidade > 2) {
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
    
    criarParticulasGiro() {
        // Partículas ultra sutis e harmônicas
        if (Math.random() < 0.3) { // Menos partículas para suavidade
            const particula = document.createElement('div');
            particula.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 215, 0, 0.4);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: particulaGiroHarmonica 1.2s ease-out forwards;
                z-index: 1000;
            `;
            
            document.body.appendChild(particula);
            
            setTimeout(() => {
                if (particula.parentNode) {
                    particula.parentNode.removeChild(particula);
                }
            }, 1200);
        }
    }
    
    criarConfetes() {
        // Confetes ultra elegantes e harmônicos
        for (let i = 0; i < 8; i++) {
            const confete = document.createElement('div');
            const cores = ['#ffd700', '#ff6b6b', '#4ecdc4', '#9b59b6'];
            
            confete.style.cssText = `
                position: fixed;
                width: ${Math.random() * 3 + 1.5}px;
                height: ${Math.random() * 3 + 1.5}px;
                background: ${cores[Math.floor(Math.random() * cores.length)]};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: -10px;
                pointer-events: none;
                animation: confeteFallHarmonico ${2 + Math.random() * 1}s ease-out forwards;
                animation-delay: ${Math.random() * 0.8}s;
                z-index: 10000;
            `;
            
            document.body.appendChild(confete);
        }
        
        setTimeout(() => {
            const confetes = document.querySelectorAll('div');
            confetes.forEach(confete => {
                if (confete.style.animation && confete.style.animation.includes('confeteFallHarmonico')) {
                    confete.remove();
                }
            });
        }, 4000);
    }
    
    limparEfeitos() {
        // Limpar efeitos gradualmente
        const limparGradual = () => {
            this.brilhoBase = this.lerp(this.brilhoBase, 1, 0.1);
            this.saturacaoBase = this.lerp(this.saturacaoBase, 1, 0.1);
            
            if (elements.roleta) {
                elements.roleta.style.filter = `brightness(${this.brilhoBase}) saturate(${this.saturacaoBase})`;
                
                if (Math.abs(this.brilhoBase - 1) < 0.01 && Math.abs(this.saturacaoBase - 1) < 0.01) {
                    elements.roleta.style.filter = '';
                    elements.roleta.classList.remove('girando');
                    if (elements.roletaContainer) {
                        elements.roletaContainer.classList.remove('girando');
                    }
                } else {
                    requestAnimationFrame(limparGradual);
                }
            }
        };
        
        limparGradual();
    }
    
    lerp(a, b, t) {
        return a + (b - a) * t;
    }
}

// ===== INSTÂNCIAS DOS SISTEMAS ULTRA HARMÔNICOS =====
const fisica = new FisicaUltraFluida();
const audioSystem = new AudioSystemHarmonico();
const efeitos = new EfeitosVisuaisHarmonicos();

// ===== FUNÇÕES PRINCIPAIS ULTRA FLUIDAS =====

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎰 Inicializando RoletaWin Giro Ultra Fluido...');
    
    // Verificar se todos os elementos existem
    const elementosObrigatorios = ['btnGirar', 'btnParar', 'roleta'];
    const elementosFaltando = elementosObrigatorios.filter(id => !elements[id]);
    
    if (elementosFaltando.length > 0) {
        console.error('❌ Elementos obrigatórios não encontrados:', elementosFaltando);
        return;
    }
    
    // Inicializar sistemas
    inicializarEstilosHarmonicos();
    inicializarEventListeners();
    
    // Estado inicial
    gameState.estadoRoleta = ESTADOS_ROLETA.IDLE;
    
    console.log('✅ RoletaWin Giro Ultra Fluido inicializada com sucesso!');
});

// Adicionar estilos CSS ultra harmônicos
function inicializarEstilosHarmonicos() {
    const style = document.createElement('style');
    style.textContent = `
        /* Animações ultra harmônicas para performance máxima */
        @keyframes particulaGiroHarmonica {
            0% {
                transform: translateY(0) scale(0) rotate(0deg);
                opacity: 0;
            }
            30% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-30px) scale(0.8) rotate(180deg);
                opacity: 0;
            }
        }
        
        @keyframes confeteFallHarmonico {
            0% {
                transform: translateY(0) rotate(0deg) scale(1);
                opacity: 0.8;
            }
            100% {
                transform: translateY(100vh) rotate(360deg) scale(0.6);
                opacity: 0;
            }
        }
        
        /* Otimizações ultra avançadas para movimento harmônico */
        #roleta {
            transition: filter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            will-change: transform;
            transform-origin: center center;
            backface-visibility: hidden;
            perspective: 1000px;
            transform-style: preserve-3d;
        }
        
        /* Efeitos de hover ultra suaves */
        button {
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        button:hover {
            transform: translateY(-1px);
        }
        
        button:active {
            transform: translateY(0);
            transition: all 0.1s ease;
        }
        
        /* Otimizações ultra avançadas de performance */
        .mesa-roleta-display {
            contain: layout style paint;
            transform: translateZ(0);
        }
        
        .roleta-premium {
            contain: layout style paint;
            transform: translateZ(0);
        }
        
        /* Transições ultra suaves para classes */
        .girando {
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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
        criarEfeitoRippleHarmonico(e, elements.btnGirar);
        handleGirarClick();
    });
    
    elements.btnParar.addEventListener('click', (e) => {
        criarEfeitoRippleHarmonico(e, elements.btnParar);
        handlePararClick();
    });
    
    // Eventos de teclado
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !gameState.bloqueado) {
            e.preventDefault();
            if (gameState.estadoRoleta === ESTADOS_ROLETA.IDLE) {
                handleGirarClick();
            } else if (gameState.estadoRoleta === ESTADOS_ROLETA.SPINNING) {
                handlePararClick();
            }
        }
    });
}

// Criar efeito ripple ultra harmônico
function criarEfeitoRippleHarmonico(event, elemento) {
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
        background: rgba(255, 255, 255, 0.15);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleHarmonico 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        pointer-events: none;
    `;
    
    elemento.style.position = 'relative';
    elemento.style.overflow = 'hidden';
    elemento.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 800);
}

// Handle click no botão girar
function handleGirarClick() {
    if (gameState.bloqueado || gameState.estadoRoleta !== ESTADOS_ROLETA.IDLE) {
        return;
    }
    
    iniciarGiroUltraFluido();
}

// Handle click no botão parar
function handlePararClick() {
    if (gameState.bloqueado || gameState.estadoRoleta !== ESTADOS_ROLETA.SPINNING) {
        return;
    }
    
    pararGiroUltraFluido();
}

// ===== FUNÇÃO PRINCIPAL: INICIAR GIRO ULTRA FLUIDO =====
function iniciarGiroUltraFluido() {
    if (gameState.bloqueado) return;
    
    console.log('🎯 Iniciando giro ultra fluido');
    
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
    
    // Iniciar loop de animação ultra fluido
    iniciarLoopAnimacaoUltraFluido();
    
    mostrarToast('Roleta girando com fluidez máxima!', 'info');
}

// ===== LOOP DE ANIMAÇÃO ULTRA FLUIDO =====
function iniciarLoopAnimacaoUltraFluido() {
    let ultimoTempo = performance.now();
    let contadorFrames = 0;
    let acumuladorDelta = 0;
    const targetFPS = 60;
    const frameTime = 1000 / targetFPS;
    
    function loop(tempoAtual) {
        if (gameState.estadoRoleta === ESTADOS_ROLETA.STOPPED) {
            return; // Parar loop
        }
        
        const deltaTime = tempoAtual - ultimoTempo;
        ultimoTempo = tempoAtual;
        acumuladorDelta += deltaTime;
        
        // Controle ultra preciso de FPS para máxima fluidez
        if (acumuladorDelta >= frameTime) {
            const framesDelta = Math.floor(acumuladorDelta / frameTime);
            acumuladorDelta -= framesDelta * frameTime;
            
            contadorFrames++;
            
            // Atualizar tempo de giro
            gameState.tempoGiro += frameTime * framesDelta;
            
            // Atualizar física com delta normalizado
            const estadoFisica = fisica.atualizar(frameTime * framesDelta);
            
            // Atualizar estado do jogo
            gameState.anguloAtual = estadoFisica.angulo;
            gameState.velocidadeAtual = estadoFisica.velocidade;
            
            // Aplicar rotação ultra otimizada com sub-pixel precision
            if (elements.roleta) {
                const anguloRounded = Math.round(gameState.anguloAtual * 1000) / 1000; // Precisão de 0.001°
                elements.roleta.style.transform = `translate3d(0,0,0) rotate(${anguloRounded}deg)`;
            }
            
            // Efeitos visuais ultra harmônicos
            efeitos.aplicarEfeitosVelocidade(gameState.velocidadeAtual);
            
            // Som durante o giro (ultra throttled)
            audioSystem.play('giroLoop', gameState.velocidadeAtual);
            
            // Criar partículas (ultra controlado)
            if (gameState.velocidadeAtual > 8 && contadorFrames % 45 === 0) {
                efeitos.criarParticulasGiro();
            }
            
            // Habilitar botão parar após aceleração
            if (estadoFisica.fase === 'constante' && !gameState.podeParar) {
                gameState.podeParar = true;
                elements.btnParar.disabled = false;
                mostrarToast('Agora você pode parar a roleta!', 'success');
            }
            
            // Verificar se terminou
            if (estadoFisica.completo) {
                finalizarGiroUltraFluido();
                return;
            }
        }
        
        // Continuar loop
        gameState.animacaoId = requestAnimationFrame(loop);
    }
    
    gameState.animacaoId = requestAnimationFrame(loop);
}

// ===== PARAR GIRO ULTRA FLUIDO =====
function pararGiroUltraFluido() {
    if (gameState.estadoRoleta !== ESTADOS_ROLETA.SPINNING || !gameState.podeParar) {
        return;
    }
    
    console.log('🛑 Parando giro ultra fluido');
    
    gameState.estadoRoleta = ESTADOS_ROLETA.STOPPING;
    
    // Iniciar desaceleração
    const setorAlvo = fisica.pararGiro();
    gameState.setorAlvo = setorAlvo;
    
    // Atualizar interface
    elements.btnParar.disabled = true;
    
    mostrarToast('Desacelerando suavemente...', 'warning');
}

// ===== FINALIZAR GIRO ULTRA FLUIDO =====
function finalizarGiroUltraFluido() {
    console.log('🏁 Finalizando giro ultra fluido');
    
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
    }, 600);
    
    // Som de parada
    audioSystem.play('parada');
    
    // Calcular resultado final
    const anguloFinal = (360 - (gameState.anguloAtual % 360)) % 360;
    const setorIndex = Math.floor(anguloFinal / 45);
    const setorResultado = roletaConfig.setores[setorIndex];
    
    gameState.velocidadeAtual = 0;
    
    // Resetar estado da roleta
    gameState.estadoRoleta = ESTADOS_ROLETA.IDLE;
    
    // Mostrar resultado
    setTimeout(() => {
        if (setorResultado.premio > 0) {
            efeitos.criarConfetes();
            audioSystem.play('vitoria');
        }
        
        mostrarResultado(setorResultado);
        
        // Resetar para próximo giro
        setTimeout(() => {
            trocarBotoes(false);
        }, 3000);
    }, 1000);
}

// ===== FUNÇÕES DE INTERFACE ULTRA HARMÔNICAS =====

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

// Mostrar resultado ultra harmônico
function mostrarResultado(setor) {
    const isWin = setor.premio > 0;
    
    // Criar modal de resultado
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeInHarmonico 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #1a1f3a 0%, #2d1b69 100%);
            padding: 2.5rem;
            border-radius: 20px;
            text-align: center;
            border: 2px solid ${isWin ? '#ffd700' : '#ff6b6b'};
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
            animation: slideInHarmonico 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        ">
            <div style="font-size: 3rem; margin-bottom: 1rem;">
                ${isWin ? '🎉' : '😔'}
            </div>
            <div style="
                font-size: 2rem; 
                margin-bottom: 1rem; 
                color: ${isWin ? '#ffd700' : '#ff6b6b'}; 
                font-weight: bold; 
                font-family: 'Orbitron', monospace;
            ">
                ${setor.texto}
            </div>
            <div style="
                font-size: 1.1rem; 
                color: #ffffff; 
                margin-bottom: 1.5rem;
            ">
                ${isWin ? '🎊 Parabéns! Você ganhou!' : '🔄 Tente novamente!'}
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
                color: #0a0e27;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: 10px;
                font-weight: 600;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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

// Mostrar toast ultra harmônico
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
        padding: 0.8rem 1.2rem;
        border-radius: 10px;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRightHarmonico 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        font-size: 0.9rem;
    `;
    
    toast.textContent = mensagem;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRightHarmonico 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 400);
    }, 3000);
}

// Adicionar animações CSS ultra harmônicas
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes fadeInHarmonico {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideInHarmonico {
        from { transform: translateY(-40px) scale(0.9); opacity: 0; }
        to { transform: translateY(0) scale(1); opacity: 1; }
    }
    
    @keyframes slideInRightHarmonico {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    
    @keyframes slideOutRightHarmonico {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }
    
    @keyframes rippleHarmonico {
        to { transform: scale(2.5); opacity: 0; }
    }
`;
document.head.appendChild(animationStyle);

