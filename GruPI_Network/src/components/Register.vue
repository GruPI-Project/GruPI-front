<template>
  <div class="container">
    <img src="/logo.png" alt="Logo" class="top-left-image" />
    <div class="left-bar">
      <div class="left-bar-text">
        Encontre pessoas para seu <span class="highlight">PROJETO INTEGRADOR</span> e inicie a jornada rumo à <span class="highlight">EXCELÊNCIA ACADÊMICA!</span>
      </div>
      <div class="left-bar-small-text">
        A plataforma de Match da UNIVESP para conectar você à sua futura equipe.
      </div>
    </div>

    <div class="form-wrapper">
      <h2 class="form-title"><b>Cadastre-se e faça parte de um</b> ambiente colaborativo<b>!</b></h2>
      <form class="form-grid" @submit.prevent="handleSubmit">
        <!-- Coluna da Esquerda -->
        <div class="form-column">
          <label for="nome">Nome</label>
          <input id="nome" v-model="form.nome" type="text" required />

          <label for="email">E-mail Acadêmico</label>
          <input id="email" v-model="form.email" type="email" required />

          <label for="polo">Polo</label>
          <select id="polo" v-model="form.polo">
            <option disabled value="">Selecione seu Polo</option>
            <option v-for="polo in poloOptions" :key="polo.id" :value="polo.id">{{ polo.nome }}</option>
          </select>

          <label for="drp">DRP</label>
          <select id="drp" v-model="form.drp">
            <option disabled value="">Selecione seu DRP</option>
            <option v-for="drp in drpOptions" :key="drp.id" :value="drp.id">
              {{ drp.nome }}
            </option>
          </select>

          <label for="senha">Senha</label>
          <input id="senha" v-model="form.senha" type="password" required />

        </div>

        <!-- Coluna da Direita -->
        <div class="form-column">

          <label for="sobrenome">Sobrenome</label>
          <input id="sobrenome" v-model="form.sobrenome" type="text" required />

          <label for="eixo">Eixo</label>
          <select id="eixo" v-model="form.eixo">
            <option disabled value="">Selecione um Eixo</option>
            <option v-for="eixo in eixoOptions" :key="eixo.id" :value="eixo.id">{{ eixo.nome }}</option>
          </select>

          <label for="curso">Curso</label>
          <select id="curso" v-model="form.curso">
            <option disabled value="">Selecione seu Curso</option>
            <option v-for="curso in cursoOptions" :key="curso.id" :value="curso.id">{{ curso.nome }}</option>
          </select>

          <label for="projeto_integrador">Projeto Integrador</label>
          <select id="projeto_integrador" v-model="form.projeto_integrador">
            <option disabled value="">Você já possui projeto integrador?</option>
            <option :value="true">Sim</option>
            <option :value="false">Não</option>
          </select>

          <label for="confirmarSenha">Confirme a Senha</label>
          <input id="confirmarSenha" v-model="form.confirmarSenha" type="password" required />
        </div>
      </form>

      <!-- Botão abaixo do formulário -->
      <div class="form-button">
        <button type="submit">Registrar</button>
      </div>
      <div class="login-text">
        Já possui uma conta?
        <a href="/login" class="login-link" target="_blank">Entre aqui</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

interface Option {
  id: number;
  nome: string;
}

interface FormData {
  nome: string;
  sobrenome: string;
  email: string;
  eixo: number | null;
  curso: number | null;
  drp: number | null;
  polo: number | null;
  projeto_integrador: boolean | null;
  senha: string;
  confirmarSenha: string;
}

export default defineComponent({
  setup() {
    const form = ref<FormData>({
      nome: '',
      sobrenome: '',
      email: '',
      eixo: null,
      curso: null,
      drp: null,
      polo: null,
      projeto_integrador: null,
      senha: '',
      confirmarSenha: ''
    });

    const drpOptions = ref<Option[]>([]);
    const poloOptions = ref<Option[]>([]);
    const eixoOptions = ref<Option[]>([]);
    const cursoOptions = ref<Option[]>([]);

    const error = ref('');
    const success = ref('');

    const fetchOpcoes = async () => {
      try {
        // Ajuste estas URLs de acordo com sua API
        const [drpResp, poloResp, eixoResp, cursoResp] = await Promise.all([
          fetch('https://api.grupi-dev.pavops.net/api/v1/drps/'),
          fetch('https://api.grupi-dev.pavops.net/api/v1/polos/'),
          fetch('https://api.grupi-dev.pavops.net/api/v1/eixos/'),
          fetch('https://api.grupi-dev.pavops.net/api/v1/cursos/')
        ]);

        const drpData = await drpResp.json();
        const poloData = await poloResp.json();
        const eixoData = await eixoResp.json();
        const cursoData = await cursoResp.json();

        drpOptions.value = drpData;
        poloOptions.value = poloData;
        eixoOptions.value = eixoData;
        cursoOptions.value = cursoData;

      } catch (err) {
        console.error('Erro ao buscar opções:', err);
        error.value = 'Não foi possível carregar dados de seleção.';
      }
    };

    onMounted(() => {
      fetchOpcoes();
    });

    const handleSubmit = async () => {
      console.log('handleSubmit iniciado');

      error.value = '';
      success.value = '';

      if (form.value.senha !== form.value.confirmarSenha) {
        error.value = 'As senhas não coincidem.';
        return;
      }

      if (!form.value.email.toLowerCase().endsWith('@faculdade.edu')) {
        error.value = 'Use um e-mail institucional (terminando em @faculdade.edu).';
        return;
      }

      if (
        form.value.drp === null ||
        form.value.polo === null ||
        form.value.eixo === null ||
        form.value.curso === null ||
        form.value.projeto_integrador === null
      ) {
        error.value = 'Preencha todos os campos obrigatórios.';
        return;
      }

      try {
        const response = await fetch('https://api.grupi-dev.pavops.net/api/v1/auth/registration/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: form.value.nome,
            last_name: form.value.sobrenome,
            email: form.value.email,
            eixo: form.value.eixo,
            curso: form.value.curso,
            drp: form.value.drp,
            polo: form.value.polo,
            projeto_integrador: form.value.projeto_integrador,
            password1: form.value.senha,
            password2: form.value.confirmarSenha
          })
        });

        const data = await response.json();
        console.log('Resposta da API registro:', data);

        if (!response.ok) {
          error.value = JSON.stringify(data);
          return;
        }

        success.value = 'Registro realizado com sucesso!';
        form.value = {
          nome: '',
          sobrenome: '',
          email: '',
          eixo: null,
          curso: null,
          drp: null,
          polo: null,
          projeto_integrador: null,
          senha: '',
          confirmarSenha: ''
        };
      } catch (err) {
        error.value = 'Erro na comunicação com o servidor.';
        console.error(err);
      }
    };

    return {
      form,
      drpOptions,
      poloOptions,
      eixoOptions,
      cursoOptions,
      error,
      success,
      handleSubmit
    };
  }
});
</script>

<style scoped>
/* Seu CSS permanece igual — você pode manter todo o estilo que já tinha */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  overflow: hidden;
  font-family: Arial, sans-serif;
}

.top-left-image {
  position: absolute;
  top: 0px;
  left: 2px;
  width: 478px;
  height: 400px;
  z-index: 10;
}

.container {
  display: flex;
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: white;
}

label {
  font-size: 16px;
  margin-bottom: 6px;
  color: #333;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}

.left-bar {
  width: 25%;
  height: 100%;
  background-color: #9E1B32;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.left-bar-text {
  font-size: 27px;
  line-height: 1.6;
  max-width: 80%;
  color: white;
  font-family: 'Poppins', sans-serif;
}

.left-bar-small-text {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  line-height: 1.6;
  color: white;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  max-width: 80%;
}

.highlight {
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
}

.form-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.form-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #181818;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  width: 100%;
}

.form-grid {
  display: flex;
  gap: 40px;
  margin-bottom: 20px;
}

.form-column {
  display: flex;
  flex-direction: column;
}

input {
  width: 400px;
  padding: 20px 34px;
  font-size: 18px;
  border-radius: 8px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  margin-bottom: 20px;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

input:focus {
  border-color: #e63946;
  box-shadow: 0 8px 14px rgba(230, 57, 70, 0.5);
  outline: none;
}

select {
  width: 400px;
  padding: 24px 30px;
  font-size: 20px;
  border-radius: 8px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  margin-bottom: 20px;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  appearance: none;
}

select:focus {
  border-color: #e63946;
  box-shadow: 0 8px 14px rgba(230, 57, 70, 0.5);
  outline: none;
}

.form-button {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}

button {
  padding: 10px 20px;
  font-size: 32px;
  background-color: #9E1B32;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

button:hover {
  box-shadow: 0 8px 12px rgba(0,0,0,0.3);
  transform: translateY(-2px);
}

.login-text {
  margin-top: 20px;
  font-size: 16px;
  color: #333;
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

.login-link {
  color: #9E1B32;
  text-decoration: none;
  font-weight: bold;
  margin-left: 5px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.login-link:hover {
  color: #181818;
  background-color: #cccccc;
}
</style>
