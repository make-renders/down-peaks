import { create } from 'zustand';

interface FormState {
  isSubmitting: boolean;
  submitForm: (data: { username: string; email: string; message: string }) => Promise<void>;
}

export const formPostSheetsStore = create<FormState>((set) => ({
  isSubmitting: false,
  submitForm: async (data) => {
    set({ isSubmitting: true });

    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('message', data.message);

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxEpYyXK5edgTPantLwV90bWm_Ik8Zg9GaJAVP2tjbrx5bUFKfy_9vMt2ygXLbZbufl7g/exec', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario.');
      }

      console.log('Formulario enviado correctamente.');
    } catch (error) {
      console.error(error);
    } finally {
      set({ isSubmitting: false });
    }
  },
}));
