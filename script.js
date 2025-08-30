// ===== ROLETA PROFISSIONAL COM GIRO ULTRA REFINADO =====

// Estados da máquina de estados da roleta
const ESTADOS_ROLETA = {
    IDLE: 'idle',
    SPINNING: 'spinning',
    STOPPING: 'stopping',
    STOPPED: 'stopped'
};

// Estado do jogo com gerenciamento ultra robusto
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
    ultimoFrame: 0,
    
    // Métricas de qualidade
    framesPerdidos: 0,
    qualidadeGiro: 1.0
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

// ===== SISTEMA DE FÍSICA PROFISSIONAL PARA GIRO ULTRA REFINADO =====

class FisicaProfissional {
    constructor() {
        this.reset();
        this.initializeAdvancedPhysics();
    }
    
    initializeAdvancedPhysics() {
        // Configurações ultra refinadas para movimento profissional
        this.config = {
            // Tempos otimizados para máxima fluidez
            tempoAceleracao: 2500,      // 2.5s - aceleração mais longa e suave
            tempoDesaceleracao: 5000,   // 5s - desaceleração ultra suave
            
            // Velocidades calibradas para movimento natural
            velocidadeMinima: 1.0,      // Início muito suave
            velocidadeMaxima: 10,       // Velocidade máxima controlada
            
            // Parâmetros de suavização ultra avançados
            suavizacao: 0.05,           // Suavização extremamente sutil
            atrito: 0.9999,             // Atrito quase imperceptível
            inercia: 0.99,              // Inércia muito alta
            
            // Sistema de interpolação profissional
            maxHistorico: 12,           // Mais histórico para suavização
            maxBuffer: 5,               // Buffer maior para estabilidade
            
            // Precisão ultra alta
            precisaoAlvo: 0.2,          // Precisão extremamente alta
            toleranciaVelocidade: 0.01, // Tolerância mínima
            
            // Configurações de qualidade
            fpsTarget: 60,
            deltaTimeMin: 10,
            deltaTimeMax: 20,
            
            // Sistema de ondas harmônicas refinado
            frequenciaBase: 0.0005,     // Frequência ainda mais baixa
            amplitudeBase: 0.08,        // Amplitude muito sutil
            harmonicos: [
                { freq: 1.0, amp: 1.0, phase: 0 },      // Fundamental
                { freq: 2.0, amp: 0.2, phase: Math.PI/4 }, // Segunda harmônica
                { freq: 0.5, amp: 0.15, phase: Math.PI/2 }, // Sub-harmônica
                { freq: 3.0, amp: 0.05, phase: Math.PI/3 }  // Terceira harmônica
            ]
        };
    }
    
    reset() {
        this.angulo = 0;
        this.velocidade = 0;
        this.velocidadeAlvo = 0;
        this.aceleracao = 0;
        this.tempo = 0;
        this.fase = 'idle';
        this.parandoForcado = false;
        
        // Buffers de suavização
        this.historico = [];
        this.buffer = [];
        this.velocidadeMedia = 0;
        
        // Sistema de convergência
        this.anguloAlvo = 0;
        this.convergenciaAtiva = false;
        
        // Métricas de qualidade
        this.qualidade = {
            estabilidade: 1.0,
            suavidade: 1.0,
            precisao: 1.0
        };
        
        // Sistema de compensação adaptativa
        this.compensacao = {
            deltaTimeAcumulado: 0,
            framesConsecutivos: 0,
            ajusteVelocidade: 1.0
        };
    }

    iniciarGiro() {
        this.reset();
        this.fase = 'acelerando';
        this.velocidade = this.config.velocidadeMinima;
        this.velocidadeAlvo = this.config.velocidadeMaxima;
        
        // Adicionar variação sutil na velocidade máxima
        const variacao = (Math.random() - 0.5) * 0.4; // ±0.2
        this.velocidadeAlvo += variacao;
        
        return null;
    }

    pararGiro() {
        if (this.fase === 'acelerando' || this.fase === 'constante') {
            this.parandoForcado = true;
            this.fase = 'desacelerando';
            this.tempo = 0;
            this.convergenciaAtiva = true;
            
            // Algoritmo ultra refinado para determinar setor alvo
            const anguloAtual = this.angulo % 360;
            const setorAtual = Math.floor(anguloAtual / 45);
            
            // Cálculo profissional do setor alvo
            const voltasExtras = 2.5 + Math.random() * 1.5; // 2.5-4 voltas
            const setoresExtras = Math.floor(Math.random() * 3) + 1; // 1-3 setores
            const proximoSetor = (setorAtual + setoresExtras) % 8;
            
            // Calcular ângulo alvo com precisão ultra alta
            const anguloSetor = proximoSetor * 45;
            const ajusteFino = (Math.random() - 0.5) * 8; // ±4 graus de variação
            
            this.anguloAlvo = this.angulo + (voltasExtras * 360) + 
                             (anguloSetor - (anguloAtual % 360)) + ajusteFino;
            
            return proximoSetor;
        }
        return null;
    }

    atualizar(deltaTime) {
        // Normalização ultra robusta do deltaTime
        const dtNormalizado = this.normalizarDeltaTime(deltaTime);
        this.tempo += dtNormalizado;
        
        // Atualizar sistema de compensação adaptativa
        this.atualizarCompensacao(dtNormalizado);
        
        // Atualizar buffers de suavização
        this.atualizarBuffers();
        
        // Calcular velocidade baseada na fase atual
        switch (this.fase) {
            case 'acelerando':
                this.atualizarAceleracaoProfissional(dtNormalizado);
                break;
            case 'constante':
                this.atualizarConstanteProfissional(dtNormalizado);
                break;
            case 'desacelerando':
                this.atualizarDesaceleracaoProfissional(dtNormalizado);
                break;
        }

        // Sistema de suavização ultra avançado com múltiplas camadas
        this.aplicarSuavizacaoAvancada();
        
        // Aplicar atrito ultra sutil
        this.velocidade *= this.config.atrito;
        
        // Atualizar ângulo com compensação adaptativa
        const incrementoAngulo = this.velocidade * dtNormalizado * 0.6 * this.compensacao.ajusteVelocidade;
        this.angulo += incrementoAngulo;
        
        // Calcular métricas de qualidade
        this.calcularQualidade();

        return {
            angulo: this.angulo % 360,
            velocidade: Math.abs(this.velocidade),
            fase: this.fase,
            completo: this.fase === 'parado',
            qualidade: this.qualidade
        };
    }

    normalizarDeltaTime(deltaTime) {
        // Normalização ultra robusta com limites estreitos
        const dtClampado = Math.min(Math.max(deltaTime, this.config.deltaTimeMin), this.config.deltaTimeMax);
        const dtNormalizado = dtClampado / (1000 / this.config.fpsTarget);
        
        // Acumular delta time para compensação
        this.compensacao.deltaTimeAcumulado += Math.abs(dtClampado - (1000 / this.config.fpsTarget));
        
        return dtNormalizado;
    }

    atualizarCompensacao(dt) {
        this.compensacao.framesConsecutivos++;
        
        // Ajuste adaptativo baseado na estabilidade
        if (this.compensacao.framesConsecutivos % 30 === 0) {
            const estabilidadeMedia = this.compensacao.deltaTimeAcumulado / 30;
            
            if (estabilidadeMedia > 2) {
                this.compensacao.ajusteVelocidade = Math.max(0.95, this.compensacao.ajusteVelocidade - 0.01);
            } else if (estabilidadeMedia < 1) {
                this.compensacao.ajusteVelocidade = Math.min(1.05, this.compensacao.ajusteVelocidade + 0.005);
            }
            
            this.compensacao.deltaTimeAcumulado = 0;
        }
    }

    atualizarBuffers() {
        // Atualizar buffer de velocidade
        this.buffer.push(this.velocidade);
        if (this.buffer.length > this.config.maxBuffer) {
            this.buffer.shift();
        }
        
        // Atualizar histórico com peso temporal
        this.historico.push({
            velocidade: this.velocidade,
            tempo: this.tempo,
            peso: 1.0
        });
        
        if (this.historico.length > this.config.maxHistorico) {
            this.historico.shift();
        }
        
        // Calcular velocidade média ponderada
        this.calcularVelocidadeMedia();
    }

    calcularVelocidadeMedia() {
        if (this.historico.length === 0) return;
        
        let somaVelocidade = 0;
        let somaPesos = 0;
        
        for (let i = 0; i < this.historico.length; i++) {
            const entrada = this.historico[i];
            const pesoTemporal = (i + 1) / this.historico.length; // Peso crescente
            const pesoFinal = entrada.peso * pesoTemporal;
            
            somaVelocidade += entrada.velocidade * pesoFinal;
            somaPesos += pesoFinal;
        }
        
        this.velocidadeMedia = somaPesos > 0 ? somaVelocidade / somaPesos : this.velocidade;
    }

    atualizarAceleracaoProfissional(dt) {
        if (this.tempo < this.config.tempoAceleracao) {
            const progresso = this.tempo / this.config.tempoAceleracao;
            
            // Curva de aceleração ultra suave (easeOutQuint)
            const curva = 1 - Math.pow(1 - progresso, 5);
            
            // Adicionar variação harmônica ultra sutil
            const variacao = this.calcularVariacaoHarmonica() * 0.05;
            
            this.velocidadeAlvo = this.config.velocidadeMinima + 
                                (this.config.velocidadeMaxima - this.config.velocidadeMinima) * curva + variacao;
        } else {
            this.fase = 'constante';
            this.velocidadeAlvo = this.config.velocidadeMaxima;
        }
    }

    atualizarConstanteProfissional(dt) {
        // Sistema de variação harmônica ultra refinado
        const variacao = this.calcularVariacaoHarmonica();
        this.velocidadeAlvo = this.config.velocidadeMaxima + variacao;
        
        // Limites ultra estreitos para movimento ultra consistente
        const limiteInferior = this.config.velocidadeMaxima * 0.99;
        const limiteSuperior = this.config.velocidadeMaxima * 1.01;
        this.velocidadeAlvo = Math.max(limiteInferior, Math.min(limiteSuperior, this.velocidadeAlvo));
    }

    atualizarDesaceleracaoProfissional(dt) {
        if (this.tempo < this.config.tempoDesaceleracao) {
            const progresso = this.tempo / this.config.tempoDesaceleracao;
            
            // Curva de desaceleração ultra suave (easeInQuint)
            const curva = progresso * progresso * progresso * progresso * progresso;
            
            this.velocidadeAlvo = this.config.velocidadeMaxima * (1 - curva);
            
            // Sistema de convergência ultra refinado para ângulo alvo
            if (this.convergenciaAtiva && progresso > 0.3) {
                this.aplicarConvergenciaAlvo(progresso);
            }
            
            // Fase final de precisão ultra alta
            if (progresso > 0.98) {
                this.aplicarPrecisaoFinal(progresso);
            }
        } else {
            this.fase = 'parado';
            this.velocidadeAlvo = 0;
            this.velocidade = 0;
            this.angulo = this.anguloAlvo;
        }
    }

    aplicarConvergenciaAlvo(progresso) {
        const fatorConvergencia = (progresso - 0.3) / 0.7;
        const convergencia = this.easeInOutQuint(fatorConvergencia);
        
        const diferenca = this.anguloAlvo - this.angulo;
        const ajuste = diferenca * convergencia * 0.001; // Ajuste ultra sutil
        
        this.angulo += ajuste;
    }

    aplicarPrecisaoFinal(progresso) {
        const precisao = (progresso - 0.98) / 0.02;
        const diferenca = this.anguloAlvo - this.angulo;
        
        if (Math.abs(diferenca) < 2) { // Dentro de 2 graus
            this.angulo += diferenca * precisao * 0.15;
        }
    }

    calcularVariacaoHarmonica() {
        let variacao = 0;
        
        for (const harmonico of this.config.harmonicos) {
            const freq = this.config.frequenciaBase * harmonico.freq;
            const amp = this.config.amplitudeBase * harmonico.amp;
            const phase = harmonico.phase || 0;
            
            variacao += Math.sin(this.tempo * freq + phase) * amp;
        }
        
        return variacao;
    }

    aplicarSuavizacaoAvancada() {
        // Camada 1: Suavização com histórico ponderado
        const velocidadeHistorico = this.velocidadeMedia;
        
        // Camada 2: Suavização com buffer
        const velocidadeBuffer = this.buffer.reduce((a, b) => a + b, 0) / this.buffer.length;
        
        // Camada 3: Interpolação linear ultra sutil
        const velocidadeInterpolada = this.lerp(this.velocidade, this.velocidadeAlvo, this.config.suavizacao);
        
        // Combinação ponderada das três camadas
        const peso1 = 0.4; // Histórico
        const peso2 = 0.3; // Buffer
        const peso3 = 0.3; // Interpolação
        
        this.velocidade = (velocidadeHistorico * peso1) + 
                         (velocidadeBuffer * peso2) + 
                         (velocidadeInterpolada * peso3);
    }

    calcularQualidade() {
        // Calcular estabilidade baseada na variação de velocidade
        if (this.buffer.length > 1) {
            const variacao = this.calcularVariacao(this.buffer);
            this.qualidade.estabilidade = Math.max(0, 1 - (variacao * 10));
        }
        
        // Calcular suavidade baseada na aceleração
        if (this.historico.length > 1) {
            const aceleracaoMedia = this.calcularAceleracaoMedia();
            this.qualidade.suavidade = Math.max(0, 1 - (Math.abs(aceleracaoMedia) * 5));
        }
        
        // Calcular precisão baseada na proximidade do alvo
        if (this.convergenciaAtiva) {
            const diferenca = Math.abs(this.anguloAlvo - this.angulo);
            this.qualidade.precisao = Math.max(0, 1 - (diferenca / 180));
        }
    }

    calcularVariacao(array) {
        if (array.length < 2) return 0;
        
        const media = array.reduce((a, b) => a + b, 0) / array.length;
        const variancia = array.reduce((acc, val) => acc + Math.pow(val - media, 2), 0) / array.length;
        return Math.sqrt(variancia);
    }

    calcularAceleracaoMedia() {
        if (this.historico.length < 2) return 0;
        
        let somaAceleracao = 0;
        for (let i = 1; i < this.historico.length; i++) {
            const deltaV = this.historico[i].velocidade - this.historico[i-1].velocidade;
            const deltaT = this.historico[i].tempo - this.historico[i-1].tempo;
            somaAceleracao += deltaT > 0 ? deltaV / deltaT : 0;
        }
        
        return somaAceleracao / (this.historico.length - 1);
    }

    // Funções de easing ultra suaves
    lerp(a, b, t) {
        return a + (b - a) * Math.min(t, 1);
    }

    easeOutQuint(t) {
        return 1 - Math.pow(1 - t, 5);
    }

    easeInQuint(t) {
        return t * t * t * t * t;
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
        this.volume = 0.08; // Volume ainda mais baixo
        this.muted = false;
        this.ultimoSom = 0;
        this.qualidadeAudio = 'high';
        this.init();
    }
    
    async init() {
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.context.createGain();
            this.masterGain.connect(this.context.destination);
            this.masterGain.gain.value = this.volume;
            
            // Configurar qualidade de áudio
            if (this.context.sampleRate) {
                this.qualidadeAudio = this.context.sampleRate >= 44100 ? 'high' : 'medium';
            }
        } catch (e) {
            console.log('❌ Áudio não suportado:', e);
        }
    }
    
    play(type, velocidade = 1, qualidade = null) {
        if (!this.context || this.muted) return;
        
        const agora = this.context.currentTime;
        const qualidadeGiro = qualidade?.estabilidade || 1;
        
        // Throttle ultra agressivo baseado na qualidade
        const throttleTime = qualidadeGiro > 0.8 ? 0.2 : 0.3;
        if (type === 'giroLoop' && agora - this.ultimoSom < throttleTime) return;
        this.ultimoSom = agora;
        
        switch (type) {
            case 'giroInicio':
                this.playGiroInicioProfissional(agora);
                break;
            case 'giroLoop':
                this.playGiroLoopProfissional(agora, velocidade, qualidadeGiro);
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
        // Som de início ultra refinado
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        const filter = this.context.createBiquadFilter();
        const reverb = this.createReverb();
        
        oscillator.connect(filter);
        filter.connect(reverb);
        reverb.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        oscillator.frequency.setValueAtTime(180, agora);
        oscillator.frequency.exponentialRampToValueAtTime(320, agora + 1.2);
        oscillator.type = 'sine';
        
        // Filtro refinado
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, agora);
        filter.frequency.exponentialRampToValueAtTime(500, agora + 1.2);
        filter.Q.value = 0.3;
        
        gainNode.gain.setValueAtTime(0.02, agora);
        gainNode.gain.exponentialRampToValueAtTime(0.001, agora + 1.2);
        
        oscillator.start(agora);
        oscillator.stop(agora + 1.2);
    }
    
    playGiroLoopProfissional(agora, velocidade, qualidade) {
        // Som ultra sutil durante o giro baseado na qualidade
        const probabilidade = qualidade > 0.9 ? 0.02 : 0.01;
        
        if (Math.random() < probabilidade) {
            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();
            const filter = this.context.createBiquadFilter();
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.masterGain);
            
            const freq = 60 + (velocidade * 1.2);
            oscillator.frequency.value = freq;
            oscillator.type = 'sine';
            
            filter.type = 'lowpass';
            filter.frequency.value = 250;
            filter.Q.value = 0.2;
            
            const volume = Math.min(0.005, velocidade * 0.0002) * qualidade;
            gainNode.gain.setValueAtTime(volume, agora);
            gainNode.gain.exponentialRampToValueAtTime(0.001, agora + 0.1);
            
            oscillator.start(agora);
            oscillator.stop(agora + 0.1);
        }
    }
    
    playParadaProfissional(agora) {
        // Som de parada ultra refinado
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        const filter = this.context.createBiquadFilter();
        const reverb = this.createReverb();
        
        oscillator.connect(filter);
        filter.connect(reverb);
        reverb.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        oscillator.frequency.setValueAtTime(280, agora);
        oscillator.frequency.exponentialRampToValueAtTime(80, agora + 2.0);
        oscillator.type = 'sine';
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, agora);
        filter.frequency.exponentialRampToValueAtTime(120, agora + 2.0);
        filter.Q.value = 0.4;
        
        gainNode.gain.setValueAtTime(0.015, agora);
        gainNode.gain.exponentialRampToValueAtTime(0.001, agora + 2.0);
        
        oscillator.start(agora);
        oscillator.stop(agora + 2.0);
    }
    
    playVitoriaProfissional(agora) {
        // Sequência melódica ultra refinada
        const acordes = [
            [261.63, 329.63, 392.00], // C4, E4, G4
            [293.66, 369.99, 440.00], // D4, F#4, A4
            [329.63, 415.30, 493.88], // E4, G#4, B4
            [392.00, 493.88, 587.33]  // G4, B4, D5
        ];
        
        acordes.forEach((acorde, i) => {
            acorde.forEach((freq, j) => {
                const osc = this.context.createOscillator();
                const gain = this.context.createGain();
                const filter = this.context.createBiquadFilter();
                const reverb = this.createReverb();
                
                osc.connect(filter);
                filter.connect(reverb);
                reverb.connect(gain);
                gain.connect(this.masterGain);
                
                osc.frequency.value = freq;
                osc.type = 'sine';
                
                filter.type = 'lowpass';
                filter.frequency.value = 1200;
                filter.Q.value = 0.3;
                
                const startTime = agora + i * 0.4;
                const volume = 0.01 / (j + 1);
                gain.gain.setValueAtTime(volume, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);
                
                osc.start(startTime);
                osc.stop(startTime + 0.6);
            });
        });
    }
    
    createReverb() {
        // Criar reverb sutil para profundidade
        const convolver = this.context.createConvolver();
        const length = this.context.sampleRate * 0.5; // 0.5 segundos
        const impulse = this.context.createBuffer(2, length, this.context.sampleRate);
        
        for (let channel = 0; channel < 2; channel++) {
            const channelData = impulse.getChannelData(channel);
            for (let i = 0; i < length; i++) {
                channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2) * 0.1;
            }
        }
        
        convolver.buffer = impulse;
        return convolver;
    }
}

// ===== SISTEMA DE EFEITOS VISUAIS PROFISSIONAIS =====

class EfeitosVisuaisProfissionais {
    constructor() {
        this.ultimaVelocidade = 0;
        this.transicaoSuave = 0.04; // Transição ultra suave
        this.ultimoEfeito = 0;
        this.brilhoBase = 1;
        this.saturacaoBase = 1;
        this.qualidadeVisual = 1;
        this.metricas = {
            framesPerdidos: 0,
            tempoUltimoFrame: performance.now()
        };
    }
    
    aplicarEfeitosVelocidade(velocidade, qualidade = null) {
        if (!elements.roleta) return;
        
        const agora = performance.now();
        
        // Calcular FPS atual
        const deltaFrame = agora - this.metricas.tempoUltimoFrame;
        const fpsAtual = 1000 / deltaFrame;
        this.metricas.tempoUltimoFrame = agora;
        
        // Ajustar throttle baseado no FPS
        const throttleTime = fpsAtual > 50 ? 100 : 120; // Mais agressivo se FPS baixo
        if (agora - this.ultimoEfeito < throttleTime) return;
        this.ultimoEfeito = agora;
        
        // Suavizar transições baseado na qualidade
        const qualidadeGiro = qualidade?.estabilidade || 1;
        const fatorSuavizacao = this.transicaoSuave * qualidadeGiro;
        
        this.ultimaVelocidade = this.lerp(this.ultimaVelocidade, velocidade, fatorSuavizacao);
        
        // Aplicar efeitos ultra sutis
        const intensidade = Math.min(1, this.ultimaVelocidade / 12);
        
        this.brilhoBase = this.lerp(this.brilhoBase, 1 + (intensidade * 0.15), 0.03);
        this.saturacaoBase = this.lerp(this.saturacaoBase, 1 + (intensidade * 0.1), 0.03);
        
        // Aplicar filtros com base na qualidade
        const filtros = [];
        filtros.push(`brightness(${this.brilhoBase})`);
        filtros.push(`saturate(${this.saturacaoBase})`);
        
        if (qualidadeGiro > 0.9) {
            filtros.push(`contrast(${1 + intensidade * 0.05})`);
        }
        
        elements.roleta.style.filter = filtros.join(' ');
        
        // Gerenciar classes de giro
        if (velocidade > 1.5) {
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
    
    criarParticulasGiro(qualidade = null) {
        const qualidadeGiro = qualidade?.estabilidade || 1;
        
        // Partículas baseadas na qualidade
        if (Math.random() < 0.2 * qualidadeGiro) {
            const particula = document.createElement('div');
            particula.style.cssText = `
                position: absolute;
                width: ${1 + qualidadeGiro}px;
                height: ${1 + qualidadeGiro}px;
                background: rgba(255, 215, 0, ${0.3 * qualidadeGiro});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: particulaGiroProfissional ${1.0 + qualidadeGiro * 0.5}s ease-out forwards;
                z-index: 1000;
            `;
            
            document.body.appendChild(particula);
            
            setTimeout(() => {
                if (particula.parentNode) {
                    particula.parentNode.removeChild(particula);
                }
            }, 1500);
        }
    }
    
    criarConfetes() {
        // Confetes ultra elegantes
        for (let i = 0; i < 6; i++) {
            const confete = document.createElement('div');
            const cores = ['#ffd700', '#ff6b6b', '#4ecdc4', '#9b59b6', '#f39c12'];
            
            confete.style.cssText = `
                position: fixed;
                width: ${Math.random() * 2 + 1}px;
                height: ${Math.random() * 2 + 1}px;
                background: ${cores[Math.floor(Math.random() * cores.length)]};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: -10px;
                pointer-events: none;
                animation: confeteFallProfissional ${2.5 + Math.random() * 1}s ease-out forwards;
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
        }, 5000);
    }
    
    limparEfeitos() {
        const limparGradual = () => {
            this.brilhoBase = this.lerp(this.brilhoBase, 1, 0.08);
            this.saturacaoBase = this.lerp(this.saturacaoBase, 1, 0.08);
            
            if (elements.roleta) {
                elements.roleta.style.filter = `brightness(${this.brilhoBase}) saturate(${this.saturacaoBase})`;
                
                if (Math.abs(this.brilhoBase - 1) < 0.005 && Math.abs(this.saturacaoBase - 1) < 0.005) {
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

// ===== INSTÂNCIAS DOS SISTEMAS PROFISSIONAIS =====
const fisica = new FisicaProfissional();
const audioSystem = new AudioSystemProfissional();
const efeitos = new EfeitosVisuaisProfissionais();

// ===== FUNÇÕES PRINCIPAIS PROFISSIONAIS =====

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎰 Inicializando RoletaWin Giro Profissional...');
    
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
    inicializarMonitoramento();
    
    // Estado inicial
    gameState.estadoRoleta = ESTADOS_ROLETA.IDLE;
    
    console.log('✅ RoletaWin Giro Profissional inicializada com sucesso!');
});

// Adicionar estilos CSS profissionais
function inicializarEstilosProfissionais() {
    const style = document.createElement('style');
    style.textContent = `
        /* Animações profissionais para performance máxima */
        @keyframes particulaGiroProfissional {
            0% {
                transform: translateY(0) scale(0) rotate(0deg);
                opacity: 0;
            }
            40% {
                opacity: 0.8;
            }
            100% {
                transform: translateY(-40px) scale(1) rotate(270deg);
                opacity: 0;
            }
        }
        
        @keyframes confeteFallProfissional {
            0% {
                transform: translateY(0) rotate(0deg) scale(1);
                opacity: 0.9;
            }
            100% {
                transform: translateY(100vh) rotate(720deg) scale(0.4);
                opacity: 0;
            }
        }
        
        /* Otimizações ultra avançadas para movimento profissional */
        #roleta {
            transition: filter 0.6s cubic-bezier(0.23, 1, 0.32, 1);
            will-change: transform, filter;
            transform-origin: center center;
            backface-visibility: hidden;
            perspective: 1000px;
            transform-style: preserve-3d;
            contain: layout style paint;
        }
        
        /* Efeitos de hover ultra refinados */
        button {
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
            will-change: transform;
        }
        
        button:hover {
            transform: translateY(-2px) scale(1.02);
        }
        
        button:active {
            transform: translateY(0) scale(0.98);
            transition: all 0.15s ease;
        }
        
        /* Otimizações profissionais de performance */
        .mesa-roleta-display {
            contain: layout style paint;
            transform: translateZ(0);
            will-change: transform;
        }
        
        .roleta-premium {
            contain: layout style paint;
            transform: translateZ(0);
            will-change: transform;
        }
        
        /* Transições ultra refinadas */
        .girando {
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        /* Indicador de qualidade */
        .qualidade-indicator {
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 12px;
            z-index: 10000;
            display: none;
        }
    `;
    document.head.appendChild(style);
}

// Inicializar monitoramento de qualidade
function inicializarMonitoramento() {
    // Criar indicador de qualidade (opcional, para debug)
    const indicator = document.createElement('div');
    indicator.className = 'qualidade-indicator';
    indicator.id = 'qualidade-indicator';
    document.body.appendChild(indicator);
    
    // Monitorar performance
    setInterval(() => {
        if (gameState.estadoRoleta === ESTADOS_ROLETA.SPINNING) {
            const qualidade = fisica.qualidade;
            const qualidadeMedia = (qualidade.estabilidade + qualidade.suavidade + qualidade.precisao) / 3;
            gameState.qualidadeGiro = qualidadeMedia;
            
            // Atualizar indicador (se visível)
            const indicator = document.getElementById('qualidade-indicator');
            if (indicator && indicator.style.display !== 'none') {
                indicator.textContent = `Qualidade: ${(qualidadeMedia * 100).toFixed(1)}%`;
            }
        }
    }, 1000);
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
        
        // Debug: mostrar/ocultar indicador de qualidade
        if (e.code === 'KeyQ' && e.ctrlKey) {
            const indicator = document.getElementById('qualidade-indicator');
            if (indicator) {
                indicator.style.display = indicator.style.display === 'none' ? 'block' : 'none';
            }
        }
    });
}

// Criar efeito ripple profissional
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
        background: rgba(255, 255, 255, 0.12);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleProfissional 1s cubic-bezier(0.23, 1, 0.32, 1);
        pointer-events: none;
    `;
    
    elemento.style.position = 'relative';
    elemento.style.overflow = 'hidden';
    elemento.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1000);
}

// Handle click no botão girar
function handleGirarClick() {
    if (gameState.bloqueado || gameState.estadoRoleta !== ESTADOS_ROLETA.IDLE) {
        return;
    }
    
    iniciarGiroProfissional();
}

// Handle click no botão parar
function handlePararClick() {
    if (gameState.bloqueado || gameState.estadoRoleta !== ESTADOS_ROLETA.SPINNING) {
        return;
    }
    
    pararGiroProfissional();
}

// ===== FUNÇÃO PRINCIPAL: INICIAR GIRO PROFISSIONAL =====
function iniciarGiroProfissional() {
    if (gameState.bloqueado) return;
    
    console.log('🎯 Iniciando giro profissional');
    
    // Bloquear ações e definir estado
    gameState.bloqueado = true;
    gameState.estadoRoleta = ESTADOS_ROLETA.SPINNING;
    gameState.tempoGiro = 0;
    gameState.podeParar = false;
    gameState.qualidadeGiro = 1.0;
    
    // Resetar física
    fisica.reset();
    fisica.angulo = gameState.anguloAtual;
    fisica.iniciarGiro();
    
    // Atualizar interface
    trocarBotoes(true);
    
    // Efeitos
    audioSystem.play('giroInicio');
    
    // Iniciar loop de animação profissional
    iniciarLoopAnimacaoProfissional();
    
    mostrarToast('Roleta girando com qualidade profissional!', 'info');
}

// ===== LOOP DE ANIMAÇÃO PROFISSIONAL =====
function iniciarLoopAnimacaoProfissional() {
    let ultimoTempo = performance.now();
    let contadorFrames = 0;
    let acumuladorDelta = 0;
    let fpsInstantaneo = 60;
    const targetFPS = 60;
    const frameTime = 1000 / targetFPS;
    
    function loop(tempoAtual) {
        if (gameState.estadoRoleta === ESTADOS_ROLETA.STOPPED) {
            return; // Parar loop
        }
        
        const deltaTime = tempoAtual - ultimoTempo;
        ultimoTempo = tempoAtual;
        acumuladorDelta += deltaTime;
        
        // Calcular FPS instantâneo
        fpsInstantaneo = 1000 / deltaTime;
        
        // Controle ultra preciso de FPS profissional
        if (acumuladorDelta >= frameTime) {
            const framesDelta = Math.floor(acumuladorDelta / frameTime);
            acumuladorDelta -= framesDelta * frameTime;
            
            contadorFrames++;
            
            // Detectar frames perdidos
            if (framesDelta > 1) {
                gameState.framesPerdidos += framesDelta - 1;
            }
            
            // Atualizar tempo de giro
            gameState.tempoGiro += frameTime * framesDelta;
            
            // Atualizar física com delta normalizado
            const estadoFisica = fisica.atualizar(frameTime * framesDelta);
            
            // Atualizar estado do jogo
            gameState.anguloAtual = estadoFisica.angulo;
            gameState.velocidadeAtual = estadoFisica.velocidade;
            
            // Aplicar rotação ultra otimizada com sub-pixel precision
            if (elements.roleta) {
                const anguloRounded = Math.round(gameState.anguloAtual * 10000) / 10000; // Precisão de 0.0001°
                elements.roleta.style.transform = `translate3d(0,0,0) rotate(${anguloRounded}deg)`;
            }
            
            // Efeitos visuais profissionais
            efeitos.aplicarEfeitosVelocidade(gameState.velocidadeAtual, estadoFisica.qualidade);
            
            // Som durante o giro (ultra controlado)
            audioSystem.play('giroLoop', gameState.velocidadeAtual, estadoFisica.qualidade);
            
            // Criar partículas (ultra controlado baseado na qualidade)
            if (gameState.velocidadeAtual > 6 && contadorFrames % 60 === 0) {
                efeitos.criarParticulasGiro(estadoFisica.qualidade);
            }
            
            // Habilitar botão parar após aceleração
            if (estadoFisica.fase === 'constante' && !gameState.podeParar) {
                gameState.podeParar = true;
                elements.btnParar.disabled = false;
                mostrarToast('Agora você pode parar a roleta!', 'success');
            }
            
            // Verificar se terminou
            if (estadoFisica.completo) {
                finalizarGiroProfissional();
                return;
            }
        }
        
        // Continuar loop
        gameState.animacaoId = requestAnimationFrame(loop);
    }
    
    gameState.animacaoId = requestAnimationFrame(loop);
}

// ===== PARAR GIRO PROFISSIONAL =====
function pararGiroProfissional() {
    if (gameState.estadoRoleta !== ESTADOS_ROLETA.SPINNING || !gameState.podeParar) {
        return;
    }
    
    console.log('🛑 Parando giro profissional');
    
    gameState.estadoRoleta = ESTADOS_ROLETA.STOPPING;
    
    // Iniciar desaceleração
    const setorAlvo = fisica.pararGiro();
    gameState.setorAlvo = setorAlvo;
    
    // Atualizar interface
    elements.btnParar.disabled = true;
    
    mostrarToast('Desacelerando com precisão profissional...', 'warning');
}

// ===== FINALIZAR GIRO PROFISSIONAL =====
function finalizarGiroProfissional() {
    console.log('🏁 Finalizando giro profissional');
    
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
        }, 3500);
    }, 1200);
    
    // Log de qualidade final
    console.log(`📊 Qualidade do giro: ${(gameState.qualidadeGiro * 100).toFixed(1)}%`);
    console.log(`📊 Frames perdidos: ${gameState.framesPerdidos}`);
}

// ===== FUNÇÕES DE INTERFACE PROFISSIONAIS =====

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
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeInProfissional 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        backdrop-filter: blur(5px);
    `;
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #1a1f3a 0%, #2d1b69 100%);
            padding: 3rem;
            border-radius: 25px;
            text-align: center;
            border: 3px solid ${isWin ? '#ffd700' : '#ff6b6b'};
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
            animation: slideInProfissional 0.8s cubic-bezier(0.23, 1, 0.32, 1);
            max-width: 400px;
            width: 90%;
        ">
            <div style="font-size: 4rem; margin-bottom: 1.5rem;">
                ${isWin ? '🎉' : '😔'}
            </div>
            <div style="
                font-size: 2.5rem; 
                margin-bottom: 1.5rem; 
                color: ${isWin ? '#ffd700' : '#ff6b6b'}; 
                font-weight: bold; 
                font-family: 'Orbitron', monospace;
                text-shadow: 0 2px 10px rgba(0,0,0,0.3);
            ">
                ${setor.texto}
            </div>
            <div style="
                font-size: 1.2rem; 
                color: #ffffff; 
                margin-bottom: 2rem;
                opacity: 0.9;
            ">
                ${isWin ? '🎊 Parabéns! Você ganhou!' : '🔄 Tente novamente!'}
            </div>
            <div style="
                font-size: 0.9rem; 
                color: #888; 
                margin-bottom: 1.5rem;
            ">
                Qualidade do giro: ${(gameState.qualidadeGiro * 100).toFixed(1)}%
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
                color: #0a0e27;
                border: none;
                padding: 1rem 2rem;
                border-radius: 15px;
                font-weight: 700;
                cursor: pointer;
                font-size: 1.1rem;
                transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
                box-shadow: 0 5px 20px rgba(255, 215, 0, 0.3);
            " onmouseover="this.style.transform='translateY(-3px) scale(1.05)'" onmouseout="this.style.transform='translateY(0) scale(1)'">
                CONTINUAR
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Remover modal automaticamente após 6 segundos
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 6000);
}

// Mostrar toast profissional
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
        border-radius: 15px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRightProfissional 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        max-width: 350px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        font-size: 0.95rem;
        backdrop-filter: blur(10px);
    `;
    
    toast.textContent = mensagem;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRightProfissional 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 500);
    }, 3500);
}

// Adicionar animações CSS profissionais
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes fadeInProfissional {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideInProfissional {
        from { transform: translateY(-50px) scale(0.9); opacity: 0; }
        to { transform: translateY(0) scale(1); opacity: 1; }
    }
    
    @keyframes slideInRightProfissional {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    
    @keyframes slideOutRightProfissional {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }
    
    @keyframes rippleProfissional {
        to { transform: scale(3); opacity: 0; }
    }
`;
document.head.appendChild(animationStyle);

