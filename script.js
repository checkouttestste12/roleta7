// ===== ROLETA PROFISSIONAL ULTRA MELHORADA =====

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
    
    // Novos controles para melhor gerenciamento
    ultimoFrame: 0,
    deltaTimeAcumulado: 0
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
    girosPremiosInfo: document.getElementById('giros-premios-info'),
    roletaWrapper: document.querySelector('.roleta-premium-wrapper'),
    mesaDisplay: document.querySelector('.mesa-roleta-display')
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
        { premio: 0, texto: 'Vazio', angulo: 315 }
    ]
};

// ===== SISTEMA DE FÍSICA ULTRA MELHORADO =====

class FisicaUltraMelhorada {
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
        
        // Configurações otimizadas para movimento ultra fluido
        this.tempoAceleracao = 2000; // 2s para aceleração mais suave
        this.tempoDesaceleracao = 4000; // 4s para desaceleração mais realista
        this.velocidadeMaxima = 20 + Math.random() * 8; // 20-28 rpm - mais variação
        this.velocidadeMinima = 1.5; // Velocidade inicial mais suave
        
        // Parâmetros avançados para suavização
        this.inercia = 0.95; // Inércia mais realista
        this.ruido = 0;
        this.ultimaVelocidade = 0;
        this.velocidadeBuffer = []; // Buffer para suavização
        this.bufferSize = 5;
        
        // Sistema de convergência melhorado
        this.anguloAlvo = 0;
        this.convergenciaAtiva = false;
        this.fatorConvergencia = 0;
        
        // Variações naturais
        this.variacao1 = 0;
        this.variacao2 = 0;
        this.variacao3 = 0;
    }

    iniciarGiro() {
        this.reset();
        this.fase = 'acelerando';
        this.velocidade = this.velocidadeMinima;
        this.velocidadeBuffer = Array(this.bufferSize).fill(this.velocidadeMinima);
        return null;
    }

    pararGiro() {
        if (this.fase === 'acelerando' || this.fase === 'constante') {
            this.parandoForcado = true;
            this.fase = 'desacelerando';
            this.tempo = 0;
            this.convergenciaAtiva = true;
            
            // Cálculo ultra preciso do setor alvo
            const anguloAtual = this.angulo % 360;
            const setorAtual = Math.floor(anguloAtual / 45);
            
            // Algoritmo melhorado para determinar setor alvo
            const velocidadeNormalizada = this.velocidade / this.velocidadeMaxima;
            const voltasBase = 3; // Mínimo de 3 voltas
            const voltasExtras = Math.floor(velocidadeNormalizada * 4); // 0-4 voltas extras baseadas na velocidade
            const setoresExtras = Math.floor(Math.random() * 4) + 2; // 2-5 setores extras
            
            const proximoSetor = (setorAtual + setoresExtras) % 8;
            const voltasCompletas = voltasBase + voltasExtras;
            
            // Cálculo preciso do ângulo alvo
            const anguloSetorAlvo = proximoSetor * 45;
            const anguloRestante = (anguloSetorAlvo - (anguloAtual % 360) + 360) % 360;
            this.anguloAlvo = this.angulo + (voltasCompletas * 360) + anguloRestante;
            
            return proximoSetor;
        }
        return null;
    }

    atualizar(deltaTime) {
        // Normalizar deltaTime para 60fps com limite mais rigoroso
        const dt = Math.min(deltaTime, 20) / 16.67; // Máximo 20ms
        this.tempo += deltaTime;
        
        // Salvar velocidade anterior
        this.ultimaVelocidade = this.velocidade;
        
        // Atualizar fase atual
        switch (this.fase) {
            case 'acelerando':
                this.atualizarAceleracaoUltra(dt);
                break;
            case 'constante':
                this.atualizarConstanteUltra(dt);
                break;
            case 'desacelerando':
                this.atualizarDesaceleracaoUltra(dt);
                break;
        }

        // Sistema de buffer para suavização ultra avançada
        this.velocidadeBuffer.push(this.velocidade);
        if (this.velocidadeBuffer.length > this.bufferSize) {
            this.velocidadeBuffer.shift();
        }
        
        // Aplicar média móvel para suavização
        const velocidadeMedia = this.velocidadeBuffer.reduce((a, b) => a + b, 0) / this.velocidadeBuffer.length;
        this.velocidade = this.lerp(this.velocidade, velocidadeMedia, 0.3);
        
        // Adicionar variações naturais mais sofisticadas
        this.atualizarVariacoesNaturais();
        
        // Atualizar ângulo com movimento ultra suavizado
        const velocidadeFinal = this.velocidade + this.ruido;
        this.angulo += velocidadeFinal * dt * 0.5; // Reduzido para movimento mais controlado

        return {
            angulo: this.angulo % 360,
            velocidade: Math.abs(velocidadeFinal),
            fase: this.fase,
            completo: this.fase === 'parado',
            convergencia: this.convergenciaAtiva ? this.fatorConvergencia : 0
        };
    }

    atualizarAceleracaoUltra(dt) {
        if (this.tempo < this.tempoAceleracao) {
            const progresso = this.tempo / this.tempoAceleracao;
            
            // Curva de aceleração ultra suave (ease-out-quint)
            const curva = 1 - Math.pow(1 - progresso, 5);
            
            // Aceleração com micro-variações
            const microVariacao = Math.sin(this.tempo * 0.01) * 0.1;
            const velocidadeAlvo = this.velocidadeMinima + 
                                 (this.velocidadeMaxima - this.velocidadeMinima) * curva + microVariacao;
            
            this.velocidade = velocidadeAlvo;
        } else {
            this.fase = 'constante';
            this.velocidade = this.velocidadeMaxima;
        }
    }

    atualizarConstanteUltra(dt) {
        // Sistema de variações naturais ultra realista
        this.velocidade = this.velocidadeMaxima + this.variacao1 + this.variacao2 + this.variacao3;
        
        // Manter velocidade dentro de limites mais estreitos
        this.velocidade = Math.max(this.velocidadeMaxima * 0.85, 
                                  Math.min(this.velocidadeMaxima * 1.15, this.velocidade));
    }

    atualizarDesaceleracaoUltra(dt) {
        if (this.tempo < this.tempoDesaceleracao) {
            const progresso = this.tempo / this.tempoDesaceleracao;
            
            // Curva de desaceleração ultra realista (ease-in-out-quint)
            const curva = progresso < 0.5 
                ? 16 * progresso * progresso * progresso * progresso * progresso
                : 1 - Math.pow(-2 * progresso + 2, 5) / 2;
            
            // Desaceleração ultra suave
            this.velocidade = this.velocidadeMaxima * (1 - curva);
            
            // Sistema de convergência ultra preciso
            if (progresso > 0.3 && this.convergenciaAtiva) {
                this.fatorConvergencia = (progresso - 0.3) / 0.7;
                const convergencia = this.easeInOutQuint(this.fatorConvergencia);
                
                const diferenca = this.anguloAlvo - this.angulo;
                const ajuste = diferenca * convergencia * 0.004; // Ultra suave
                
                this.angulo += ajuste;
            }
        } else {
            this.fase = 'parado';
            this.velocidade = 0;
            this.angulo = this.anguloAlvo;
            this.convergenciaAtiva = false;
        }
    }

    atualizarVariacoesNaturais() {
        // Variações naturais mais sofisticadas
        this.variacao1 = Math.sin(this.tempo * 0.0015) * 0.3;
        this.variacao2 = Math.cos(this.tempo * 0.0035) * 0.15;
        this.variacao3 = Math.sin(this.tempo * 0.0008) * 0.4;
        
        // Ruído sutil para movimento natural
        this.ruido = (this.variacao1 + this.variacao2 + this.variacao3) * 0.5;
    }

    // Funções de easing ultra melhoradas
    lerp(a, b, t) {
        return a + (b - a) * Math.min(1, Math.max(0, t));
    }

    easeOutQuint(t) {
        return 1 - Math.pow(1 - t, 5);
    }

    easeInOutQuint(t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
}

// ===== SISTEMA DE EFEITOS VISUAIS ULTRA MELHORADO =====

class EfeitosVisuaisUltraMelhorados {
    constructor() {
        this.ultimaVelocidade = 0;
        this.transicaoSuave = 0.08; // Mais suave
        this.particulasAtivas = 0;
        this.maxParticulas = 15; // Limite para performance
        this.ultimoEfeito = 0;
    }
    
    aplicarEfeitosVelocidade(velocidade, convergencia = 0) {
        if (!elements.roleta) return;
        
        // Suavização ultra avançada
        this.ultimaVelocidade = this.lerp(this.ultimaVelocidade, velocidade, this.transicaoSuave);
        
        const velocidadeNormalizada = Math.min(1, this.ultimaVelocidade / 28);
        
        // Motion blur ultra realista
        const blur = velocidadeNormalizada * 0.8; // Reduzido para ser mais sutil
        
        // Brilho dinâmico mais sutil
        const brilho = 1 + (velocidadeNormalizada * 0.1);
        
        // Saturação ultra dinâmica
        const saturacao = 1 + (velocidadeNormalizada * 0.15);
        
        // Efeito de convergência durante parada
        const convergenciaEfeito = convergencia > 0 ? `hue-rotate(${convergencia * 30}deg)` : '';
        
        // Aplicar efeitos com transição ultra suave
        elements.roleta.style.filter = `blur(${blur}px) brightness(${brilho}) saturate(${saturacao}) ${convergenciaEfeito}`;
        
        // Sombra dinâmica ultra realista
        const sombra = velocidadeNormalizada * 15;
        const sombra2 = velocidadeNormalizada * 30;
        elements.roleta.style.boxShadow = `
            0 0 ${sombra}px rgba(255, 215, 0, ${velocidadeNormalizada * 0.4}),
            0 0 ${sombra2}px rgba(255, 215, 0, ${velocidadeNormalizada * 0.2})
        `;
        
        // Efeitos de escala durante giro
        this.aplicarEfeitosEscala(velocidadeNormalizada);
    }
    
    aplicarEfeitosEscala(velocidadeNormalizada) {
        if (!elements.roletaWrapper || !elements.mesaDisplay) return;
        
        const escala = 1 + (velocidadeNormalizada * 0.15);
        const escalaDisplay = 1 + (velocidadeNormalizada * 0.08);
        
        elements.roletaWrapper.style.transform = `scale(${escala})`;
        elements.mesaDisplay.style.transform = `scale(${escalaDisplay})`;
        
        // Adicionar classe de giro para efeitos CSS
        if (velocidadeNormalizada > 0.1) {
            elements.roletaWrapper.classList.add('girando');
            elements.mesaDisplay.classList.add('girando');
            elements.roleta.classList.add('girando');
        } else {
            elements.roletaWrapper.classList.remove('girando');
            elements.mesaDisplay.classList.remove('girando');
            elements.roleta.classList.remove('girando');
        }
    }
    
    criarParticulasGiro() {
        if (!elements.particlesBg || this.particulasAtivas >= this.maxParticulas) return;
        
        const agora = performance.now();
        if (agora - this.ultimoEfeito < 200) return; // Throttle para performance
        this.ultimoEfeito = agora;
        
        // Criar partícula única mais elaborada
        const particula = document.createElement('div');
        const tamanho = Math.random() * 2 + 1;
        const cores = [
            'rgba(255, 215, 0, 0.6)',
            'rgba(255, 107, 107, 0.4)',
            'rgba(76, 205, 196, 0.4)',
            'rgba(138, 43, 226, 0.3)'
        ];
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duracao = 1000 + Math.random() * 500;
        
        particula.style.cssText = `
            position: absolute;
            width: ${tamanho}px;
            height: ${tamanho}px;
            background: ${cores[Math.floor(Math.random() * cores.length)]};
            border-radius: 50%;
            pointer-events: none;
            left: ${x}%;
            top: ${y}%;
            animation: particleGiroUltra ${duracao}ms ease-out forwards;
            will-change: transform, opacity;
            z-index: 1;
        `;
        
        elements.particlesBg.appendChild(particula);
        this.particulasAtivas++;
        
        setTimeout(() => {
            if (particula.parentNode) {
                particula.parentNode.removeChild(particula);
                this.particulasAtivas--;
            }
        }, duracao);
    }
    
    criarConfetes() {
        if (!elements.particlesBg) return;
        
        for (let i = 0; i < 25; i++) {
            const confete = document.createElement('div');
            const cores = ['#ffd700', '#ff6b6b', '#4ecdc4', '#9b59b6', '#ff9f43', '#00ff88'];
            
            const tamanho = Math.random() * 4 + 2;
            const x = Math.random() * 100;
            const duracao = 2000 + Math.random() * 1500;
            const delay = Math.random() * 1000;
            
            confete.style.cssText = `
                position: absolute;
                width: ${tamanho}px;
                height: ${tamanho}px;
                background: ${cores[Math.floor(Math.random() * cores.length)]};
                left: ${x}%;
                top: -10px;
                pointer-events: none;
                animation: confeteFallUltra ${duracao}ms ease-out forwards;
                animation-delay: ${delay}ms;
                will-change: transform;
                z-index: 2;
            `;
            
            elements.particlesBg.appendChild(confete);
        }
        
        setTimeout(() => {
            const confetes = elements.particlesBg.querySelectorAll('div');
            confetes.forEach(confete => {
                if (confete.style.animation.includes('confeteFallUltra')) {
                    confete.remove();
                }
            });
        }, 4000);
    }
    
    limparEfeitos() {
        if (elements.roleta) {
            elements.roleta.style.filter = '';
            elements.roleta.style.boxShadow = '';
            elements.roleta.classList.remove('girando');
        }
        
        if (elements.roletaWrapper) {
            elements.roletaWrapper.style.transform = '';
            elements.roletaWrapper.classList.remove('girando');
        }
        
        if (elements.mesaDisplay) {
            elements.mesaDisplay.style.transform = '';
            elements.mesaDisplay.classList.remove('girando');
        }
    }
    
    lerp(a, b, t) {
        return a + (b - a) * t;
    }
}

// ===== SISTEMA DE ÁUDIO ULTRA MELHORADO =====

class AudioSystemUltraMelhorado {
    constructor() {
        this.context = null;
        this.masterGain = null;
        this.volume = 0.2; // Volume ainda mais sutil
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
        
        switch (type) {
            case 'giroInicio':
                this.playGiroInicio(agora);
                break;
            case 'giroLoop':
                this.playGiroLoop(agora, velocidade);
                break;
            case 'parada':
                this.playParada(agora);
                break;
            case 'vitoria':
                this.playVitoria(agora);
                break;
        }
    }
    
    playGiroInicio(agora) {
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        const filter = this.context.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        oscillator.frequency.setValueAtTime(200, agora);
        oscillator.frequency.exponentialRampToValueAtTime(400, agora + 0.4);
        oscillator.type = 'sine';
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, agora);
        filter.frequency.exponentialRampToValueAtTime(1200, agora + 0.4);
        
        gainNode.gain.setValueAtTime(0.06, agora);
        gainNode.gain.exponentialRampToValueAtTime(0.001, agora + 0.8);
        
        oscillator.start(agora);
        oscillator.stop(agora + 0.8);
    }
    
    playGiroLoop(agora, velocidade) {
        // Som ultra sutil durante o giro
        const agora_ms = performance.now();
        if (agora_ms - this.ultimoSom < 150) return; // Throttle
        this.ultimoSom = agora_ms;
        
        if (Math.random() < 0.08) { // 8% de chance
            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.masterGain);
            
            const freq = 120 + (velocidade * 3);
            oscillator.frequency.value = freq;
            oscillator.type = 'triangle';
            
            const volume = Math.min(0.02, velocidade * 0.001);
            gainNode.gain.setValueAtTime(volume, agora);
            gainNode.gain.exponentialRampToValueAtTime(0.001, agora + 0.15);
            
            oscillator.start(agora);
            oscillator.stop(agora + 0.15);
        }
    }
    
    playParada(agora) {
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        const filter = this.context.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        oscillator.frequency.setValueAtTime(400, agora);
        oscillator.frequency.exponentialRampToValueAtTime(200, agora + 1.5);
        oscillator.type = 'sine';
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, agora);
        filter.frequency.exponentialRampToValueAtTime(300, agora + 1.5);
        
        gainNode.gain.setValueAtTime(0.05, agora);
        gainNode.gain.exponentialRampToValueAtTime(0.001, agora + 1.5);
        
        oscillator.start(agora);
        oscillator.stop(agora + 1.5);
    }
    
    playVitoria(agora) {
        // Sequência melódica ultra elaborada
        const notas = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5
        
        notas.forEach((freq, i) => {
            const osc = this.context.createOscillator();
            const gain = this.context.createGain();
            const filter = this.context.createBiquadFilter();
            
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);
            
            osc.frequency.value = freq;
            osc.type = 'sine';
            
            filter.type = 'lowpass';
            filter.frequency.value = freq * 2;
            
            const startTime = agora + i * 0.15;
            gain.gain.setValueAtTime(0.03, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
            
            osc.start(startTime);
            osc.stop(startTime + 0.4);
        });
    }
}

// ===== INSTÂNCIAS DOS SISTEMAS ULTRA MELHORADOS =====
const fisica = new FisicaUltraMelhorada();
const audioSystem = new AudioSystemUltraMelhorado();
const efeitos = new EfeitosVisuaisUltraMelhorados();

// ===== FUNÇÕES PRINCIPAIS ULTRA MELHORADAS =====

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎰 Iniciando RoletaWin Ultra Melhorada...');
    
    // Verificar elementos essenciais
    if (!elements.btnGirar || !elements.roleta) {
        console.error('❌ Elementos essenciais não encontrados');
        return;
    }
    
    // Inicializar sistemas
    inicializarEventListeners();
    adicionarEstilosUltraMelhorados();
    criarParticulas();
    
    // Criar container para toast se não existir
    if (!elements.toastContainer) {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(container);
        elements.toastContainer = container;
    }
    
    // Criar elemento de resultado se não existir
    if (!elements.resultado) {
        const resultado = document.createElement('div');
        resultado.id = 'resultado';
        resultado.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(26, 31, 58, 0.95);
            border-radius: 20px;
            padding: 2rem;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 215, 0, 0.3);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;
        document.body.appendChild(resultado);
        elements.resultado = resultado;
        
        // Adicionar estilo para mostrar resultado
        const style = document.createElement('style');
        style.textContent = `
            #resultado.show {
                opacity: 1 !important;
                visibility: visible !important;
                transform: translate(-50%, -50%) scale(1) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('✅ RoletaWin Ultra Melhorada carregada com sucesso!');
});

// Adicionar estilos ultra melhorados
function adicionarEstilosUltraMelhorados() {
    const style = document.createElement('style');
    style.id = 'ultra-melhorado-styles';
    style.textContent = `
        /* Animações ultra melhoradas */
        @keyframes particleGiroUltra {
            0% {
                transform: translateY(0) scale(0) rotate(0deg);
                opacity: 0;
            }
            20% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                transform: translateY(-80px) scale(0.5) rotate(720deg);
                opacity: 0;
            }
        }
        
        @keyframes confeteFallUltra {
            0% {
                transform: translateY(0) rotate(0deg) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(120vh) rotate(1080deg) scale(0.3);
                opacity: 0;
            }
        }
        
        /* Melhorar transições da roleta */
        #roleta {
            transition: filter 0.2s ease, box-shadow 0.2s ease;
            will-change: transform;
        }
        
        .roleta-premium-wrapper {
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .mesa-roleta-display {
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        /* Efeitos de giro ultra melhorados */
        .roleta-premium.girando {
            animation: roletaGlowUltra 1s ease-in-out infinite alternate;
        }
        
        @keyframes roletaGlowUltra {
            0% { 
                box-shadow: 0 0 30px rgba(255, 215, 0, 0.5), 
                            inset 0 0 15px rgba(255, 215, 0, 0.2),
                            0 0 60px rgba(255, 215, 0, 0.1);
            }
            100% { 
                box-shadow: 0 0 60px rgba(255, 215, 0, 0.8), 
                            inset 0 0 30px rgba(255, 215, 0, 0.4),
                            0 0 100px rgba(255, 215, 0, 0.3);
            }
        }
        
        /* Toast ultra melhorado */
        .toast {
            padding: 1rem 1.5rem;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            will-change: transform;
            max-width: 300px;
        }
        
        /* Otimizar performance */
        .toast, .roleta-premium, .roleta-premium-wrapper {
            will-change: transform;
        }
        
        /* Botões ultra melhorados */
        .btn-jogar {
            transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .btn-jogar:disabled {
            transition: all 0.3s ease;
        }
        
        /* Efeito ripple ultra melhorado */
        @keyframes rippleUltra {
            to {
                transform: scale(2.5);
                opacity: 0;
            }
        }
        
        /* Indicadores de velocidade */
        .velocidade-indicator {
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 215, 0, 0.1);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            color: #ffd700;
            border: 1px solid rgba(255, 215, 0, 0.3);
            backdrop-filter: blur(10px);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .roleta-premium-wrapper.girando .velocidade-indicator {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

// Inicializar event listeners ultra melhorados
function inicializarEventListeners() {
    if (!elements.btnGirar || !elements.btnParar) {
        console.error('❌ Elementos de botão não encontrados');
        return;
    }
    
    elements.btnGirar.addEventListener('click', (e) => {
        criarEfeitoRippleUltra(e, elements.btnGirar);
        handleGirarClick();
    });
    
    elements.btnParar.addEventListener('click', (e) => {
        criarEfeitoRippleUltra(e, elements.btnParar);
        handlePararClick();
    });
    
    // Eventos de teclado melhorados
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !gameState.bloqueado) {
            e.preventDefault();
            if (gameState.estadoRoleta === ESTADOS_ROLETA.IDLE) {
                handleGirarClick();
            } else if (gameState.estadoRoleta === ESTADOS_ROLETA.SPINNING && gameState.podeParar) {
                handlePararClick();
            }
        }
    });
    
    // Prevenir spam de cliques
    let ultimoClick = 0;
    const throttleClick = (callback) => {
        return function(e) {
            const agora = performance.now();
            if (agora - ultimoClick > 300) { // 300ms throttle
                ultimoClick = agora;
                callback(e);
            }
        };
    };
    
    elements.btnGirar.addEventListener('click', throttleClick(handleGirarClick));
    elements.btnParar.addEventListener('click', throttleClick(handlePararClick));
}

// Handle click no botão girar
function handleGirarClick() {
    if (gameState.bloqueado || gameState.estadoRoleta !== ESTADOS_ROLETA.IDLE) {
        return;
    }
    
    iniciarGiroUltraMelhorado();
}

// Handle click no botão parar
function handlePararClick() {
    if (gameState.bloqueado || gameState.estadoRoleta !== ESTADOS_ROLETA.SPINNING || !gameState.podeParar) {
        return;
    }
    
    pararGiroUltraMelhorado();
}

// ===== FUNÇÃO PRINCIPAL: INICIAR GIRO ULTRA MELHORADO =====
function iniciarGiroUltraMelhorado() {
    if (gameState.bloqueado) return;
    
    console.log('🎯 Iniciando giro ultra melhorado');
    
    // Bloquear ações e definir estado
    gameState.bloqueado = true;
    gameState.estadoRoleta = ESTADOS_ROLETA.SPINNING;
    gameState.tempoGiro = 0;
    gameState.podeParar = false;
    gameState.ultimoFrame = performance.now();
    gameState.deltaTimeAcumulado = 0;
    
    // Resetar física
    fisica.reset();
    fisica.angulo = gameState.anguloAtual;
    fisica.iniciarGiro();
    
    // Atualizar interface
    trocarBotoes(true);
    
    // Efeitos
    audioSystem.play('giroInicio');
    
    // Adicionar indicador de velocidade
    adicionarIndicadorVelocidade();
    
    // Iniciar loop de animação ultra melhorado
    iniciarLoopAnimacaoUltraMelhorado();
    
    mostrarToast('Roleta girando com sistema ultra melhorado! Aguarde para poder parar.', 'info');
}

// ===== LOOP DE ANIMAÇÃO ULTRA MELHORADO =====
function iniciarLoopAnimacaoUltraMelhorado() {
    function loop(tempoAtual) {
        if (gameState.estadoRoleta === ESTADOS_ROLETA.STOPPED) {
            return; // Parar loop
        }
        
        // Calcular deltaTime com maior precisão
        const deltaTime = tempoAtual - gameState.ultimoFrame;
        gameState.ultimoFrame = tempoAtual;
        
        // Acumular deltaTime para suavização
        gameState.deltaTimeAcumulado += deltaTime;
        
        // Processar apenas se acumulou tempo suficiente (60fps target)
        if (gameState.deltaTimeAcumulado >= 16.67) {
            // Atualizar tempo de giro
            gameState.tempoGiro += gameState.deltaTimeAcumulado;
            
            // Atualizar física
            const estadoFisica = fisica.atualizar(gameState.deltaTimeAcumulado);
            
            // Atualizar estado do jogo
            gameState.anguloAtual = estadoFisica.angulo;
            gameState.velocidadeAtual = estadoFisica.velocidade;
            
            // Aplicar rotação com transform ultra otimizado
            if (elements.roleta) {
                elements.roleta.style.transform = `rotate(${gameState.anguloAtual}deg)`;
            }
            
            // Efeitos visuais baseados na velocidade
            efeitos.aplicarEfeitosVelocidade(gameState.velocidadeAtual, estadoFisica.convergencia);
            
            // Atualizar indicadores
            atualizarIndicadoresUltra(estadoFisica);
            
            // Som durante o giro (throttled)
            audioSystem.play('giroLoop', gameState.velocidadeAtual);
            
            // Criar partículas durante o giro (throttled)
            if (gameState.velocidadeAtual > 12 && Math.random() < 0.1) {
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
                finalizarGiroUltraMelhorado();
                return;
            }
            
            // Reset acumulador
            gameState.deltaTimeAcumulado = 0;
        }
        
        // Continuar loop
        gameState.animacaoId = requestAnimationFrame(loop);
    }
    
    gameState.animacaoId = requestAnimationFrame(loop);
}

// ===== PARAR GIRO ULTRA MELHORADO =====
function pararGiroUltraMelhorado() {
    if (gameState.estadoRoleta !== ESTADOS_ROLETA.SPINNING || !gameState.podeParar) {
        return;
    }
    
    console.log('🛑 Parando giro ultra melhorado');
    
    gameState.estadoRoleta = ESTADOS_ROLETA.STOPPING;
    
    // Iniciar desaceleração
    const setorAlvo = fisica.pararGiro();
    gameState.setorAlvo = setorAlvo;
    
    // Atualizar interface
    elements.btnParar.disabled = true;
    
    mostrarToast('Parando com precisão ultra melhorada...', 'warning');
}

// ===== FINALIZAR GIRO ULTRA MELHORADO =====
function finalizarGiroUltraMelhorado() {
    console.log('🏁 Finalizando giro ultra melhorado');
    
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
        removerIndicadorVelocidade();
    }, 800);
    
    // Som de parada
    audioSystem.play('parada');
    
    // Calcular resultado final
    const anguloFinal = (360 - (gameState.anguloAtual % 360)) % 360;
    const setorIndex = Math.floor(anguloFinal / 45);
    const setorResultado = roletaConfig.setores[setorIndex];
    
    gameState.velocidadeAtual = 0;
    
    // Resetar estado da roleta
    gameState.estadoRoleta = ESTADOS_ROLETA.IDLE;
    
    // Mostrar resultado com delay
    setTimeout(() => {
        if (setorResultado.premio > 0) {
            efeitos.criarConfetes();
            audioSystem.play('vitoria');
        }
        
        mostrarResultadoUltra(setorResultado);
        
        // Resetar para próximo giro
        setTimeout(() => {
            trocarBotoes(false);
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

// Atualizar indicadores ultra melhorados
function atualizarIndicadoresUltra(estadoFisica) {
    // Atualizar indicador de velocidade
    const indicador = document.querySelector('.velocidade-indicator');
    if (indicador) {
        const tempoMinutos = Math.floor(gameState.tempoGiro / 60000);
        const tempoSegundos = Math.floor((gameState.tempoGiro % 60000) / 1000);
        const tempoFormatado = `${tempoMinutos}:${tempoSegundos.toString().padStart(2, '0')}`;
        
        let statusText = '';
        switch (estadoFisica.fase) {
            case 'acelerando':
                statusText = `Acelerando... ${estadoFisica.velocidade.toFixed(1)} rpm`;
                break;
            case 'constante':
                statusText = `${estadoFisica.velocidade.toFixed(1)} rpm • ${tempoFormatado}`;
                break;
            case 'desacelerando':
                const convergencia = Math.round(estadoFisica.convergencia * 100);
                statusText = `Parando... ${estadoFisica.velocidade.toFixed(1)} rpm (${convergencia}%)`;
                break;
        }
        
        indicador.textContent = statusText;
    }
}

// Adicionar indicador de velocidade
function adicionarIndicadorVelocidade() {
    if (!elements.roletaWrapper) return;
    
    const indicador = document.createElement('div');
    indicador.className = 'velocidade-indicator';
    indicador.textContent = 'Iniciando...';
    
    elements.roletaWrapper.appendChild(indicador);
}

// Remover indicador de velocidade
function removerIndicadorVelocidade() {
    const indicador = document.querySelector('.velocidade-indicator');
    if (indicador) {
        indicador.remove();
    }
}

// Mostrar resultado ultra melhorado
function mostrarResultadoUltra(setor) {
    const isWin = setor.premio > 0;
    
    elements.resultado.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 20px; animation: bounce 0.6s ease;">
                ${isWin ? '🎉' : '😔'}
            </div>
            <div style="font-size: 2.5rem; margin-bottom: 15px; color: ${isWin ? '#ffd700' : '#ff6b6b'}; font-family: 'Orbitron', monospace; font-weight: 700;">
                ${setor.texto}
            </div>
            <div style="font-size: 1.3rem; opacity: 0.9; color: #cccccc; line-height: 1.5;">
                ${isWin ? 'Parabéns! Você ganhou com o sistema ultra melhorado!' : 'Tente novamente! O sistema está ainda mais preciso!'}
            </div>
        </div>
    `;
    
    // Adicionar animação de bounce se não existir
    if (!document.querySelector('#bounce-style')) {
        const style = document.createElement('style');
        style.id = 'bounce-style';
        style.textContent = `
            @keyframes bounce {
                0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
                40%, 43% { transform: translate3d(0,-30px,0); }
                70% { transform: translate3d(0,-15px,0); }
                90% { transform: translate3d(0,-4px,0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    elements.resultado.classList.add('show');
    
    setTimeout(() => {
        elements.resultado.classList.remove('show');
    }, 6000);
}

// ===== FUNÇÕES AUXILIARES ULTRA MELHORADAS =====

// Criar efeito ripple ultra melhorado
function criarEfeitoRippleUltra(event, button) {
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
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleUltra 0.6s ease-out;
        pointer-events: none;
        will-change: transform;
    `;
    
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// Toast notifications ultra melhoradas
function mostrarToast(mensagem, tipo = 'info') {
    if (!elements.toastContainer) return;
    
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
    
    elements.toastContainer.appendChild(toast);
    
    setTimeout(() => toast.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Criar partículas de fundo ultra melhoradas
function criarParticulas() {
    if (!elements.particlesBg) return;
    
    for (let i = 0; i < 15; i++) { // Reduzido para melhor performance
        const particula = document.createElement('div');
        const tamanho = Math.random() * 3 + 1;
        const cores = [
            'rgba(255, 215, 0, 0.2)',
            'rgba(138, 43, 226, 0.1)',
            'rgba(255, 105, 180, 0.1)',
            'rgba(76, 205, 196, 0.1)'
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
            animation: particleFloatUltra ${30 + Math.random() * 20}s linear infinite;
            animation-delay: ${Math.random() * 15}s;
            will-change: transform;
        `;
        
        elements.particlesBg.appendChild(particula);
    }
    
    // Adicionar CSS para animação de partículas se não existir
    if (!document.querySelector('#particle-ultra-style')) {
        const style = document.createElement('style');
        style.id = 'particle-ultra-style';
        style.textContent = `
            @keyframes particleFloatUltra {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0.2;
                }
                50% {
                    opacity: 0.5;
                }
                100% {
                    transform: translateY(-120vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

console.log('🎰 RoletaWin Ultra Melhorada carregada com sucesso!');

