<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

// PrimeVue imports
import Toast from 'primevue/toast';
import ProgressSpinner from 'primevue/progressspinner';
import { useToast } from 'primevue/usetoast';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const performLogout = async () => {
  try {
    // Clear all browser storage as additional security measure
    clearAllStorage();
    
    // Call the auth store logout method which handles backend logout
    await authStore.logout();
    
    // Show success message
    toast.add({
      severity: 'success',
      summary: 'Logout realizado com sucesso',
      detail: 'Redirecionando para página de login...',
      life: 2000
    });
    
    // Redirect to login page
    await router.push('/login');
    
  } catch (error) {
    console.error('Erro durante logout:', error);
    
    // Even if backend logout fails, clear local data and redirect
    clearAllStorage();
    authStore.$reset();
    
    toast.add({
      severity: 'error',
      summary: 'Erro no logout',
      detail: 'Encerrando sessão localmente...',
      life: 3000
    });
    
    // Redirect to login page anyway
    await router.push('/login');
  }
};

const clearAllStorage = () => {
  try {
    // Clear localStorage
    const localStorageKeys = Object.keys(localStorage);
    localStorageKeys.forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Clear sessionStorage
    const sessionStorageKeys = Object.keys(sessionStorage);
    sessionStorageKeys.forEach(key => {
      sessionStorage.removeItem(key);
    });
    
    // Clear cookies (except critical ones)
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      // Don't clear CSRF token cookie as it might be needed for immediate re-login
      if (name !== 'csrftoken' && name !== 'sessionid') {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.grupi-dev.pavops.net`;
      }
    });
    
    console.log('Cache e cookies limpos com sucesso');
  } catch (error) {
    console.warn('Erro ao limpar armazenamento:', error);
  }
};

onMounted(() => {
  // Perform logout immediately when page loads
  performLogout();
});
</script>

<template>
  <div class="logout-page">
    <Toast />
    
    <div class="logout-container">
      <div class="logout-content">
        <ProgressSpinner 
          styleClass="w-4rem h-4rem" 
          strokeWidth="8" 
          animationDuration="1s"
        />
        <h2 class="logout-title">Encerrando sessão...</h2>
        <p class="logout-message">
          Aguarde enquanto efetuamos o logout e limpamos os dados da sessão.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logout-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 1rem;
}

.logout-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 3rem 2rem;
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.logout-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.logout-title {
  color: #495057;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

.logout-message {
  color: #6c757d;
  font-size: 1rem;
  margin: 0;
  line-height: 1.5;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .logout-container {
    padding: 2rem 1.5rem;
  }
  
  .logout-title {
    font-size: 1.25rem;
  }
  
  .logout-message {
    font-size: 0.9rem;
  }
}
</style>