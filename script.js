// ===== ROLETA ULTRA PROFISSIONAL - BASEADA EM ANÁLISE DE ROLETAS REAIS =====

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

// ===== SISTEMA DE FÍSICA ULTRA PROFISSIONAL BASEADO EM ROLETAS REAIS =====

class FisicaUltraProfissional {
    constructor() {
        this.reset();
        this.initializeRealPhysics();
    }
    
    initializeRealPhysics() {
        // Configurações baseadas em roletas reais profissionais
        this.config = {
            // Tempos realistas baseados em cassinos reais
            tempoAceleracao: 1200,      // 1.2s - aceleração rápida como roletas reais
            tempoDesaceleracao: 8000,   // 8s - desaceleração longa e realista
            
            // Velocidades calibradas para movimento natural
            velocidadeMinima: 0.5,      // Início muito suave
            velocidadeMaxima: 18,       // Velocidade alta como roletas reais
            
            // Parâmetros de física realista
            atritoBase: 0.9998,         // Atrito muito sutil
            atritoProgressivo: 0.00002, // Atrito que aumenta com o tempo
            inercia: 0.995,             // Inércia alta
            
            // Sistema de interpolação ultra suave
            suavizacao: 0.08,           // Suavização moderada
            maxHistorico: 8,            // Histórico para suavização
            
            // Precisão ultra alta
            precisaoAlvo: 0.1,          // Precisão extremamente alta
            toleranciaVelocidade: 0.005, // Tolerância mínima
            
            // Configurações de qualidade
            fpsTarget: 60,
            deltaTimeMin: 8,
            deltaTimeMax: 25,
            
            // Sistema de variação natural ultra sutil
            frequenciaVariacao: 0.0008, // Frequência muito baixa
            amplitudeVariacao: 0.03,    // Amplitude muito sutil
            
            // Configurações de desaceleração exponencial
            exponenteDesaceleracao: 3.5, // Curva exponencial suave
            fatorDesaceleracao: 0.85     // Fator de desaceleração
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
        
        // Sistema de atrito progressivo
        this.atritoAtual = this.config.atritoBase;
        this.tempoTotal = 0;
    }

    iniciarGiro() {
        this.reset();
        this.fase = 'acelerando';
        this.velocidade = this.config.velocidadeMinima;
        this.velocidadeAlvo = this.config.velocidadeMaxima;
        
        // Adicionar variação sutil na velocidade máxima
        const variacao = (Math.random() - 0.5) * 0.6; // ±0.3
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
            const voltasExtras = 3.5 + Math.random() * 2; // 3.5-5.5 voltas
            const setoresExtras = Math.floor(Math.random() * 4) + 2; // 2-5 setores
            const proximoSetor = (setorAtual + setoresExtras) % 8;
            
            // Calcular ângulo alvo com precisão ultra alta
            const anguloSetor = proximoSetor * 45;
            const ajusteFino = (Math.random() - 0.5) * 6; // ±3 graus de variação
            
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
        this.tempoTotal += dtNormalizado;
        
        // Atualizar atrito progressivo (simula desgaste natural)
        this.atualizarAtritoProgressivo();
        
        // Atualizar buffers de suavização
        this.atualizarBuffers();
        
        // Calcular velocidade baseada na fase atual
        switch (this.fase) {
            case 'acelerando':
                this.atualizarAceleracaoRealista(dtNormalizado);
                break;
            case 'constante':
                this.atualizarConstanteRealista(dtNormalizado);
                break;
            case 'desacelerando':
                this.atualizarDesaceleracaoExponencial(dtNormalizado);
                break;
        }

        // Sistema de suavização ultra avançado
        this.aplicarSuavizacaoRealista();
        
        // Aplicar atrito progressivo
        this.velocidade *= this.atritoAtual;
        
        // Atualizar ângulo com precisão ultra alta
        const incrementoAngulo = this.velocidade * dtNormalizado * 0.6;
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
        return dtClampado / (1000 / this.config.fpsTarget);
    }

    atualizarAtritoProgressivo() {
        // Simula o atrito progressivo de uma roleta real
        const fatorTempo = this.tempoTotal * this.config.atritoProgressivo;
        this.atritoAtual = this.config.atritoBase - fatorTempo;
        this.atritoAtual = Math.max(0.995, this.atritoAtual); // Limite mínimo
    }

    atualizarBuffers() {
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

    atualizarAceleracaoRealista(dt) {
        if (this.tempo < this.config.tempoAceleracao) {
            const progresso = this.tempo / this.config.tempoAceleracao;
            
            // Curva de aceleração realista (easeOutCubic)
            const curva = 1 - Math.pow(1 - progresso, 3);
            
            // Adicionar variação natural ultra sutil
            const variacao = this.calcularVariacaoNatural() * 0.02;
            
            this.velocidadeAlvo = this.config.velocidadeMinima + 
                                (this.config.velocidadeMaxima - this.config.velocidadeMinima) * curva + variacao;
        } else {
            this.fase = 'constante';
            this.velocidadeAlvo = this.config.velocidadeMaxima;
        }
    }

    atualizarConstanteRealista(dt) {
        // Sistema de variação natural ultra refinado
        const variacao = this.calcularVariacaoNatural();
        this.velocidadeAlvo = this.config.velocidadeMaxima + variacao;
        
        // Limites ultra estreitos para movimento ultra consistente
        const limiteInferior = this.config.velocidadeMaxima * 0.98;
        const limiteSuperior = this.config.velocidadeMaxima * 1.02;
        this.velocidadeAlvo = Math.max(limiteInferior, Math.min(limiteSuperior, this.velocidadeAlvo));
    }

    atualizarDesaceleracaoExponencial(dt) {
        if (this.tempo < this.config.tempoDesaceleracao) {
            const progresso = this.tempo / this.config.tempoDesaceleracao;
            
            // Desaceleração exponencial realista (como roletas reais)
            const curvaExponencial = Math.pow(1 - progresso, this.config.exponenteDesaceleracao);
            
            this.velocidadeAlvo = this.config.velocidadeMaxima * curvaExponencial * this.config.fatorDesaceleracao;
            
            // Sistema de convergência ultra refinado para ângulo alvo
            if (this.convergenciaAtiva && progresso > 0.4) {
                this.aplicarConvergenciaRealista(progresso);
            }
            
            // Fase final de precisão ultra alta
            if (progresso > 0.95) {
                this.aplicarPrecisaoFinal(progresso);
            }
        } else {
            this.fase = 'parado';
            this.velocidadeAlvo = 0;
            this.velocidade = 0;
            this.angulo = this.anguloAlvo;
        }
    }

    aplicarConvergenciaRealista(progresso) {
        const fatorConvergencia = (progresso - 0.4) / 0.6;
        const convergencia = this.easeInOutCubic(fatorConvergencia);
        
        const diferenca = this.anguloAlvo - this.angulo;
        const ajuste = diferenca * convergencia * 0.0008; // Ajuste ultra sutil
        
        this.angulo += ajuste;
    }

    aplicarPrecisaoFinal(progresso) {
        const precisao = (progresso - 0.95) / 0.05;
        const diferenca = this.anguloAlvo - this.angulo;
        
        if (Math.abs(diferenca) < 1.5) { // Dentro de 1.5 graus
            this.angulo += diferenca * precisao * 0.2;
        }
    }

    calcularVariacaoNatural() {
        // Variação natural ultra sutil baseada em múltiplas frequências
        let variacao = 0;
        
        // Frequência principal
        variacao += Math.sin(this.tempoTotal * this.config.frequenciaVariacao) * this.config.amplitudeVariacao;
        
        // Frequência secundária (mais rápida, menor amplitude)
        variacao += Math.sin(this.tempoTotal * this.config.frequenciaVariacao * 3.7) * this.config.amplitudeVariacao * 0.3;
        
        // Frequência terciária (muito lenta, muito sutil)
        variacao += Math.sin(this.tempoTotal * this.config.frequenciaVariacao * 0.3) * this.config.amplitudeVariacao * 0.5;
        
        return variacao;
    }

    aplicarSuavizacaoRealista() {
        // Suavização baseada na velocidade média histórica
        const velocidadeHistorico = this.velocidadeMedia;
        
        // Interpolação linear ultra sutil
        const velocidadeInterpolada = this.lerp(this.velocidade, this.velocidadeAlvo, this.config.suavizacao);
        
        // Combinação ponderada
        const peso1 = 0.6; // Histórico
        const peso2 = 0.4; // Interpolação
        
        this.velocidade = (velocidadeHistorico * peso1) + (velocidadeInterpolada * peso2);
    }

    calcularQualidade() {
        // Calcular estabilidade baseada na variação de velocidade
        if (this.historico.length > 1) {
            const velocidades = this.historico.map(h => h.velocidade);
            const variacao = this.calcularVariacao(velocidades);
            this.qualidade.estabilidade = Math.max(0, 1 - (variacao * 8));
        }
        
        // Calcular suavidade baseada na aceleração
        if (this.historico.length > 1) {
            const aceleracaoMedia = this.calcularAceleracaoMedia();
            this.qualidade.suavidade = Math.max(0, 1 - (Math.abs(aceleracaoMedia) * 3));
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

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    easeInCubic(t) {
        return t * t * t;
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
}

// ===== SISTEMA DE ÁUDIO ULTRA PROFISSIONAL =====

class AudioSystemUltraProfissional {
    constructor() {
        this.context = null;
        this.masterGain = null;
        this.volume = 0.06; // Volume ainda mais baixo
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
        const throttleTime = qualidadeGiro > 0.9 ? 0.25 : 0.35;
        if (type === 'giroLoop' && agora - this.ultimoSom < throttleTime) return;
        this.ultimoSom = agora;
        
        switch (type) {
            case 'giroInicio':
                this.playGiroInicioRealista(agora);
                break;
            case 'giroLoop':
                this.playGiroLoopRealista(agora, velocidade, qualidadeGiro);
                break;
            case 'parada':
                this.playParadaRealista(agora);
                break;
            case 'vitoria':
                this.playVitoriaRealista(agora);
                break;
        }
    }
    
    playGiroInicioRealista(agora) {
        // Som de início ultra refinado e realista
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        const filter = this.context.createBiquadFilter();
        const reverb = this.createReverbRealista();
        
        oscillator.connect(filter);
        filter.connect(reverb);
        reverb.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        oscillator.frequency.setValueAtTime(160, agora);
        oscillator.frequency.exponentialRampToValueAtTime(280, agora + 0.8);
        oscillator.type = 'sine';
        
        // Filtro refinado
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, agora);
        filter.frequency.exponentialRampToValueAtTime(400, agora + 0.8);
        filter.Q.value = 0.2;
        
        gainNode.gain.setValueAtTime(0.015, agora);
        gainNode.gain.exponentialRampToValueAtTime(0.001, agora + 0.8);
        
        oscillator.start(agora);
        oscillator.stop(agora + 0.8);
    }
    
    playGiroLoopRealista(agora, velocidade, qualidade) {
        // Som ultra sutil durante o giro baseado na qualidade
        const probabilidade = qualidade > 0.95 ? 0.015 : 0.008;
        
        if (Math.random() < probabilidade) {
            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();
            const filter = this.context.createBiquadFilter();
            
            oscillator.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.masterGain);
            
            const freq = 50 + (velocidade * 0.8);
            oscillator.frequency.value = freq;
            oscillator.type = 'sine';
            
            filter.type = 'lowpass';
            filter.frequency.value = 200;
            filter.Q.value = 0.15;
            
            const volume = Math.min(0.003, velocidade * 0.0001) * qualidade;
            gainNode.gain.setValueAtTime(volume, agora);
            gainNode.gain.exponentialRampToValueAtTime(0.001, agora + 0.08);
            
            oscillator.start(agora);
            oscillator.stop(agora + 0.08);
        }
    }
    
    playParadaRealista(agora) {
        // Som de parada ultra refinado e realista
        const oscillator = this.context.createOscillator();
        const gainNode = this.context.createGain();
        const filter = this.context.createBiquadFilter();
        const reverb = this.createReverbRealista();
        
        oscillator.connect(filter);
        filter.connect(reverb);
        reverb.connect(gainNode);
        gainNode.connect(this.masterGain);
        
        oscillator.frequency.setValueAtTime(240, agora);
        oscillator.frequency.exponentialRampToValueAtTime(60, agora + 2.5);
        oscillator.type = 'sine';
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, agora);
        filter.frequency.exponentialRampToValueAtTime(100, agora + 2.5);
        filter.Q.value = 0.3;
        
        gainNode.gain.setValueAtTime(0.012, agora);
        gainNode.gain.exponentialRampToValueAtTime(0.001, agora + 2.5);
        
        oscillator.start(agora);
        oscillator.stop(agora + 2.5);
    }
    
    playVitoriaRealista(agora) {
        // Sequência melódica ultra refinada e elegante
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
                const reverb = this.createReverbRealista();
                
                osc.connect(filter);
                filter.connect(reverb);
                reverb.connect(gain);
                gain.connect(this.masterGain);
                
                osc.frequency.value = freq;
                osc.type = 'sine';
                
                filter.type = 'lowpass';
                filter.frequency.value = 1000;
                filter.Q.value = 0.25;
                
                const startTime = agora + i * 0.35;
                const volume = 0.008 / (j + 1);
                gain.gain.setValueAtTime(volume, startTime);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);
                
                osc.start(startTime);
                osc.stop(startTime + 0.5);
            });
        });
    }
    
    createReverbRealista() {
        // Criar reverb sutil e realista
        const convolver = this.context.createConvolver();
        const length = this.context.sampleRate * 0.3; // 0.3 segundos
        const impulse = this.context.createBuffer(2, length, this.context.sampleRate);
        
        for (let channel = 0; channel < 2; channel++) {
            const channelData = impulse.getChannelData(channel);
            for (let i = 0; i < length; i++) {
                channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 3) * 0.08;
            }
        }
        
        convolver.buffer = impulse;
        return convolver;
    }
}

// ===== SISTEMA DE EFEITOS VISUAIS ULTRA PROFISSIONAIS =====

class EfeitosVisuaisUltraProfissionais {
    constructor() {
        this.ultimaVelocidade = 0;
        this.transicaoSuave = 0.03; // Transição ultra suave
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
        const throttleTime = fpsAtual > 55 ? 80 : 100; // Mais agressivo se FPS baixo
        if (agora - this.ultimoEfeito < throttleTime) return;
        this.ultimoEfeito = agora;
        
        // Suavizar transições baseado na qualidade
        const qualidadeGiro = qualidade?.estabilidade || 1;
        const fatorSuavizacao = this.transicaoSuave * qualidadeGiro;
        
        this.ultimaVelocidade = this.lerp(this.ultimaVelocidade, velocidade, fatorSuavizacao);
        
        // Aplicar efeitos ultra sutis e realistas
        const intensidade = Math.min(1, this.ultimaVelocidade / 15);
        
        this.brilhoBase = this.lerp(this.brilhoBase, 1 + (intensidade * 0.12), 0.025);
        this.saturacaoBase = this.lerp(this.saturacaoBase, 1 + (intensidade * 0.08), 0.025);
        
        // Aplicar filtros com base na qualidade
        const filtros = [];
        filtros.push(`brightness(${this.brilhoBase})`);
        filtros.push(`saturate(${this.saturacaoBase})`);
        
        if (qualidadeGiro > 0.95) {
            filtros.push(`contrast(${1 + intensidade * 0.03})`);
        }
        
        // Adicionar um leve desfoque de movimento em alta velocidade
        if (velocidade > 12) {
            const blur = Math.min(0.5, (velocidade - 12) * 0.05);
            filtros.push(`blur(${blur}px)`);
        }
        
        elements.roleta.style.filter = filtros.join(' ');
        
        // Gerenciar classes de giro
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
    
    criarParticulasGiro(qualidade = null) {
        const qualidadeGiro = qualidade?.estabilidade || 1;
        
        // Partículas baseadas na qualidade (muito sutis)
        if (Math.random() < 0.15 * qualidadeGiro) {
            const particula = document.createElement('div');
            particula.style.cssText = `
                position: absolute;
                width: ${0.8 + qualidadeGiro * 0.4}px;
                height: ${0.8 + qualidadeGiro * 0.4}px;
                background: rgba(255, 215, 0, ${0.25 * qualidadeGiro});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: particulaGiroRealista ${1.2 + qualidadeGiro * 0.3}s ease-out forwards;
                z-index: 1000;
            `;
            
            document.body.appendChild(particula);
            
            setTimeout(() => {
                if (particula.parentNode) {
                    particula.parentNode.removeChild(particula);
                }
            }, 1800);
        }
    }
    
    criarConfetes() {
        // Confetes ultra elegantes e sutis
        for (let i = 0; i < 5; i++) {
            const confete = document.createElement('div');
            const cores = ['#ffd700', '#ff6b6b', '#4ecdc4', '#9b59b6', '#f39c12'];
            
            confete.style.cssText = `
                position: fixed;
                width: ${Math.random() * 1.5 + 0.8}px;
                height: ${Math.random() * 1.5 + 0.8}px;
                background: ${cores[Math.floor(Math.random() * cores.length)]};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: -10px;
                pointer-events: none;
                animation: confeteFallRealista ${3 + Math.random() * 1.5}s ease-out forwards;
                animation-delay: ${Math.random() * 1.2}s;
                z-index: 10000;
            `;
            
            document.body.appendChild(confete);
        }
        
        setTimeout(() => {
            const confetes = document.querySelectorAll('div');
            confetes.forEach(confete => {
                if (confete.style.animation && confete.style.animation.includes('confeteFallRealista')) {
                    confete.remove();
                }
            });
        }, 6000);
    }
    
    limparEfeitos() {
        const limparGradual = () => {
            this.brilhoBase = this.lerp(this.brilhoBase, 1, 0.06);
            this.saturacaoBase = this.lerp(this.saturacaoBase, 1, 0.06);
            
            if (elements.roleta) {
                elements.roleta.style.filter = `brightness(${this.brilhoBase}) saturate(${this.saturacaoBase})`;
                
                if (Math.abs(this.brilhoBase - 1) < 0.003 && Math.abs(this.saturacaoBase - 1) < 0.003) {
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

// ===== INSTÂNCIAS DOS SISTEMAS ULTRA PROFISSIONAIS =====
const fisica = new FisicaUltraProfissional();
const audioSystem = new AudioSystemUltraProfissional();
const efeitos = new EfeitosVisuaisUltraProfissionais();

// ===== FUNÇÕES PRINCIPAIS ULTRA PROFISSIONAIS =====

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
    inicializarEstilosUltraProfissionais();
    inicializarEventListeners();
    inicializarMonitoramento();
    
    // Estado inicial
    gameState.estadoRoleta = ESTADOS_ROLETA.IDLE;
    
    console.log('✅ RoletaWin Giro Ultra Profissional inicializada com sucesso!');
});

// Adicionar estilos CSS ultra profissionais
function inicializarEstilosUltraProfissionais() {
    const style = document.createElement('style');
    style.textContent = `
        /* Animações ultra profissionais para performance máxima */
        @keyframes particulaGiroRealista {
            0% {
                transform: translateY(0) scale(0) rotate(0deg);
                opacity: 0;
            }
            30% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-35px) scale(1) rotate(180deg);
                opacity: 0;
            }
        }
        
        @keyframes confeteFallRealista {
            0% {
                transform: translateY(0) rotate(0deg) scale(1);
                opacity: 0.8;
            }
            100% {
                transform: translateY(100vh) rotate(540deg) scale(0.3);
                opacity: 0;
            }
        }
        
        /* Otimizações ultra avançadas para movimento ultra profissional */
        #roleta {
            transition: filter 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            will-change: transform, filter;
            transform-origin: center center;
            backface-visibility: hidden;
            perspective: 1000px;
            transform-style: preserve-3d;
            contain: layout style paint;
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
        }
        
        /* Efeitos de hover ultra refinados */
        button {
            transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            will-change: transform;
        }
        
        button:hover {
            transform: translateY(-1.5px) scale(1.015);
        }
        
        button:active {
            transform: translateY(0) scale(0.985);
            transition: all 0.12s ease;
        }
        
        /* Otimizações ultra profissionais de performance */
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
            transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        /* Indicador de qualidade */
        .qualidade-indicator {
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 11px;
            z-index: 10000;
            display: none;
            font-family: monospace;
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
                indicator.textContent = `Q: ${(qualidadeMedia * 100).toFixed(1)}% | FPS: ${gameState.fps.toFixed(0)}`;
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
        criarEfeitoRippleUltraProfissional(e, elements.btnGirar);
        handleGirarClick();
    });
    
    elements.btnParar.addEventListener('click', (e) => {
        criarEfeitoRippleUltraProfissional(e, elements.btnParar);
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

// Criar efeito ripple ultra profissional
function criarEfeitoRippleUltraProfissional(event, elemento) {
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
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleUltraProfissional 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        pointer-events: none;
    `;
    
    elemento.style.position = 'relative';
    elemento.style.overflow = 'hidden';
    elemento.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1200);
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
    gameState.qualidadeGiro = 1.0;
    
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
    
    mostrarToast('Roleta girando com qualidade ultra profissional!', 'info');
}

// ===== LOOP DE ANIMAÇÃO ULTRA PROFISSIONAL =====
function iniciarLoopAnimacaoUltraProfissional() {
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
        gameState.fps = fpsInstantaneo;
        
        // Controle ultra preciso de FPS ultra profissional
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
                const anguloRounded = Math.round(gameState.anguloAtual * 100000) / 100000; // Precisão de 0.00001°
                elements.roleta.style.transform = `translate3d(0,0,0) rotate(${anguloRounded}deg)`;
            }
            
            // Efeitos visuais ultra profissionais
            efeitos.aplicarEfeitosVelocidade(gameState.velocidadeAtual, estadoFisica.qualidade);
            
            // Som durante o giro (ultra controlado)
            audioSystem.play('giroLoop', gameState.velocidadeAtual, estadoFisica.qualidade);
            
            // Criar partículas (ultra controlado baseado na qualidade)
            if (gameState.velocidadeAtual > 8 && contadorFrames % 80 === 0) {
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
                finalizarGiroUltraProfissional();
                return;
            }
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
    
    mostrarToast('Desacelerando com precisão ultra profissional...', 'warning');
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
    }, 1000);
    
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
        }, 4000);
    }, 1500);
    
    // Log de qualidade final
    console.log(`📊 Qualidade do giro: ${(gameState.qualidadeGiro * 100).toFixed(1)}%`);
    console.log(`📊 Frames perdidos: ${gameState.framesPerdidos}`);
    console.log(`📊 FPS médio: ${gameState.fps.toFixed(1)}`);
}

// ===== FUNÇÕES DE INTERFACE ULTRA PROFISSIONAIS =====

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

// Mostrar resultado ultra profissional
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
        background: rgba(0, 0, 0, 0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeInUltraProfissional 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        backdrop-filter: blur(8px);
    `;
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #1a1f3a 0%, #2d1b69 100%);
            padding: 3.5rem;
            border-radius: 30px;
            text-align: center;
            border: 3px solid ${isWin ? '#ffd700' : '#ff6b6b'};
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
            animation: slideInUltraProfissional 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            max-width: 450px;
            width: 90%;
        ">
            <div style="font-size: 4.5rem; margin-bottom: 1.8rem;">
                ${isWin ? '🎉' : '😔'}
            </div>
            <div style="
                font-size: 2.8rem; 
                margin-bottom: 1.8rem; 
                color: ${isWin ? '#ffd700' : '#ff6b6b'}; 
                font-weight: bold; 
                font-family: 'Orbitron', monospace;
                text-shadow: 0 3px 15px rgba(0,0,0,0.4);
            ">
                ${setor.texto}
            </div>
            <div style="
                font-size: 1.3rem; 
                color: #ffffff; 
                margin-bottom: 2.2rem;
                opacity: 0.95;
            ">
                ${isWin ? '🎊 Parabéns! Você ganhou!' : '🔄 Tente novamente!'}
            </div>
            <div style="
                font-size: 0.95rem; 
                color: #aaa; 
                margin-bottom: 1.8rem;
                font-family: monospace;
            ">
                Qualidade: ${(gameState.qualidadeGiro * 100).toFixed(1)}% | FPS: ${gameState.fps.toFixed(0)}
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
                color: #0a0e27;
                border: none;
                padding: 1.2rem 2.5rem;
                border-radius: 18px;
                font-weight: 700;
                cursor: pointer;
                font-size: 1.15rem;
                transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                box-shadow: 0 6px 25px rgba(255, 215, 0, 0.4);
            " onmouseover="this.style.transform='translateY(-4px) scale(1.08)'" onmouseout="this.style.transform='translateY(0) scale(1)'">
                CONTINUAR
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Remover modal automaticamente após 7 segundos
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 7000);
}

// Mostrar toast ultra profissional
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
        top: 25px;
        right: 25px;
        background: ${cores[tipo]};
        color: white;
        padding: 1.2rem 1.8rem;
        border-radius: 18px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRightUltraProfissional 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        max-width: 380px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        font-size: 1rem;
        backdrop-filter: blur(12px);
    `;
    
    toast.textContent = mensagem;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRightUltraProfissional 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 600);
    }, 4000);
}

// Adicionar animações CSS ultra profissionais
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes fadeInUltraProfissional {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideInUltraProfissional {
        from { transform: translateY(-60px) scale(0.85); opacity: 0; }
        to { transform: translateY(0) scale(1); opacity: 1; }
    }
    
    @keyframes slideInRightUltraProfissional {
        from { transform: translateX(120%); }
        to { transform: translateX(0); }
    }
    
    @keyframes slideOutRightUltraProfissional {
        from { transform: translateX(0); }
        to { transform: translateX(120%); }
    }
    
    @keyframes rippleUltraProfissional {
        to { transform: scale(3.5); opacity: 0; }
    }
`;
document.head.appendChild(animationStyle);

