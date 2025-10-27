import { AppConstants } from '@/constants';
import { AuthStoreType, ProfileResType } from '@/types';
import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

let globalSocket: Socket | null = null;

const useAuthStore = create<AuthStoreType>((set, get) => ({
  profile: null,
  isAuthenticated: false,
  loading: true,
  socket: null,

  setProfile: (profile: ProfileResType | null) => set({ profile }),
  setAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setLoading: (loading: boolean) => set({ loading }),

  connectSocket: (token: string) => {
    if (globalSocket && globalSocket.connected) {
      console.log('Socket đã tồn tại, bỏ qua connect');
      set({ socket: globalSocket });
      return globalSocket;
    }

    console.log('Tạo socket mới...');
    const socket: Socket = io(AppConstants.socketUrl, {
      auth: { token: `Bearer ${token}` },
      transports: ['websocket']
    });

    socket.on('connect', () => {
      console.log('Socket connected');
      socket.emit('ping', { message: 'ping from client' });
    });

    globalSocket = socket;
    set({ socket });
    return socket;
  },

  disconnectSocket: () => {
    const socket = get().socket || globalSocket;
    if (socket) {
      console.log('Disconnect socket');
      socket.disconnect();
      globalSocket = null;
      set({ socket: null });
    }
  }
}));

export default useAuthStore;
