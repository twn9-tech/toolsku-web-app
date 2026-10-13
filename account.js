(() => {
  'use strict';

  const SUPABASE_URL = 'https://jwgpmtywxcmibduyxwig.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_5MNkjmMUKFsl7Tz09HkmzQ_gM62kmjQ';
  const PAGE_SIZE = 50;
  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
  let currentUser = null;
  let recoveryMode = false;
  let cloudLoaded = 0;
  let hasMore = false;
  let loadingMore = false;
  const $ = (id) => document.getElementById(id);
  const redirectUrl = () => `${location.origin}${location.pathname}`;

  function setStatus(message, isError = false) {
    const el = $('accountStatus');
    if (!el) return;
    el.textContent = message;
    el.classList.toggle('error-text', isError);
  }

  function updateAccountUi() {
    const signedIn = Boolean(currentUser);
    $('googleLogin').hidden = signedIn || recoveryMode;
    $('emailAuthForm').hidden = signedIn && !recoveryMode;
    $('signedInBox').hidden = !signedIn || recoveryMode;
    $('signOutButton').hidden = !signedIn || recoveryMode;
    $('accountEmail').textContent = currentUser?.email || '';
    $('emailAuthTitle').textContent = recoveryMode ? 'Atur kata sandi baru' : ($('authMode').value === 'signup' ? 'Buat akun dengan email' : 'Masuk dengan email');
    $('emailSubmit').textContent = recoveryMode ? 'Simpan kata sandi baru' : ($('authMode').value === 'signup' ? 'Buat akun' : 'Masuk');
    $('passwordInput').autocomplete = recoveryMode ? 'new-password' : ($('authMode').value === 'signup' ? 'new-password' : 'current-password');
    $('passwordInput').placeholder = recoveryMode ? 'Kata sandi baru (min. 8 karakter)' : 'Kata sandi (min. 8 karakter)';
    $('authModeToggle').hidden = signedIn || recoveryMode;
    $('authModeToggle').textContent = $('authMode').value === 'signup' ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Buat akun';
    $('forgotPassword').hidden = signedIn || recoveryMode || $('authMode').value === 'signup';
    $('emailInput').disabled = recoveryMode;
  }

  function toHistoryRow(row) {
    return {
      id: row.id,
      payload: row.payload,
      dark: row.qr_color,
      light: row.background_color,
      contentType: row.content_type,
      created: new Intl.DateTimeFormat('id-ID', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(row.created_at)),
      cloud: true
    };
  }

  async function loadFirstPage() {
    if (!currentUser) return;
    const { data, error } = await client.from('qr_history')
      .select('id, content_type, payload, qr_color, background_color, created_at')
      .order('created_at', { ascending: false })
      .range(0, PAGE_SIZE - 1);
    if (error) throw error;
    const localEntries = window.RuangQRHistory.filter((item) => !item.cloud);
    const rows = (data || []).map(toHistoryRow);
    cloudLoaded = rows.length;
    hasMore = rows.length === PAGE_SIZE;
    window.RuangQRHistory.splice(0, window.RuangQRHistory.length, ...rows, ...localEntries);
    window.renderQRHistory();
    setStatus(localEntries.length
      ? `Masuk sebagai ${currentUser.email}. Riwayat akun tersinkron. ${localEntries.length} QR dari sesi sebelum login belum disimpan ke akun.`
      : `Masuk sebagai ${currentUser.email}. Riwayat akun tersinkron.`);
  }

  async function loadMore() {
    if (!currentUser || !hasMore || loadingMore) return;
    loadingMore = true;
    $('historyMore').disabled = true;
    try {
      const { data, error } = await client.from('qr_history')
        .select('id, content_type, payload, qr_color, background_color, created_at')
        .order('created_at', { ascending: false })
        .range(cloudLoaded, cloudLoaded + PAGE_SIZE - 1);
      if (error) throw error;
      const localEntries = window.RuangQRHistory.filter((item) => !item.cloud);
      const priorCloud = window.RuangQRHistory.filter((item) => item.cloud);
      const rows = (data || []).map(toHistoryRow);
      cloudLoaded += rows.length;
      hasMore = rows.length === PAGE_SIZE;
      window.RuangQRHistory.splice(0, window.RuangQRHistory.length, ...priorCloud, ...rows, ...localEntries);
      window.renderQRHistory();
    } catch (error) {
      setStatus('Riwayat lama gagal dimuat. Periksa koneksi lalu coba lagi.', true);
      console.error('Muat riwayat QR:', error);
    } finally {
      loadingMore = false;
      $('historyMore').disabled = false;
      window.renderQRHistory();
    }
  }

  async function save(item) {
    if (!currentUser) return null;
    const { data, error } = await client.from('qr_history').insert({
      content_type: item.contentType,
      payload: item.payload,
      qr_color: item.dark,
      background_color: item.light
    }).select('id, content_type, payload, qr_color, background_color, created_at').single();
    if (error) throw error;
    cloudLoaded += 1;
    return toHistoryRow(data);
  }

  async function clearHistory() {
    if (currentUser) {
      const { error } = await client.from('qr_history').delete().not('id', 'is', null);
      if (error) throw error;
      cloudLoaded = 0;
      hasMore = false;
    }
    window.RuangQRHistory.length = 0;
    window.renderQRHistory();
  }

  async function setSignedIn(user) {
    const previousId = currentUser?.id;
    const nextUser = user || null;
    if (nextUser && previousId === nextUser.id) {
      currentUser = nextUser;
      updateAccountUi();
      return;
    }
    currentUser = nextUser;
    if (!currentUser || (previousId && currentUser.id !== previousId)) {
      const localEntries = window.RuangQRHistory.filter((item) => !item.cloud);
      window.RuangQRHistory.splice(0, window.RuangQRHistory.length, ...localEntries);
      cloudLoaded = 0;
      hasMore = false;
    }
    updateAccountUi();
    window.renderQRHistory();
    if (currentUser) {
      try { await loadFirstPage(); }
      catch (error) {
        setStatus('Login berhasil, tetapi riwayat akun gagal dimuat. Coba segarkan halaman.', true);
        console.error('Muat riwayat QR:', error);
      }
    } else {
      setStatus('Belum masuk. QR hanya tersimpan sementara di sesi ini.');
    }
  }

  $('googleLogin').addEventListener('click', async () => {
    setStatus('Menghubungkan ke Google…');
    const { error } = await client.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: redirectUrl(), queryParams: { access_type: 'offline', prompt: 'select_account' } }
    });
    if (error) setStatus(`Login Google belum berhasil: ${error.message}`, true);
  });

  $('authModeToggle').addEventListener('click', () => {
    $('authMode').value = $('authMode').value === 'login' ? 'signup' : 'login';
    setStatus('');
    updateAccountUi();
  });

  $('emailAuthForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = $('emailInput').value.trim();
    const password = $('passwordInput').value;
    if (password.length < 8) {
      setStatus('Kata sandi minimal 8 karakter.', true);
      return;
    }
    $('emailSubmit').disabled = true;
    try {
      if (recoveryMode) {
        const { error } = await client.auth.updateUser({ password });
        if (error) throw error;
        recoveryMode = false;
        $('passwordInput').value = '';
        setStatus('Kata sandi berhasil diperbarui.');
        updateAccountUi();
        return;
      }
      if ($('authMode').value === 'signup') {
        const { data, error } = await client.auth.signUp({ email, password, options: { emailRedirectTo: redirectUrl() } });
        if (error) throw error;
        $('passwordInput').value = '';
        if (data.session) await setSignedIn(data.user);
        else setStatus('Akun dibuat. Buka tautan verifikasi yang dikirim ke email Anda untuk melanjutkan.');
      } else {
        const { data, error } = await client.auth.signInWithPassword({ email, password });
        if (error) throw error;
        $('passwordInput').value = '';
        await setSignedIn(data.user);
      }
    } catch (error) {
      setStatus(error.message || 'Autentikasi email gagal. Coba lagi.', true);
    } finally {
      $('emailSubmit').disabled = false;
    }
  });

  $('forgotPassword').addEventListener('click', async () => {
    const email = $('emailInput').value.trim();
    if (!email) { setStatus('Masukkan email Anda terlebih dahulu untuk menerima tautan reset.', true); return; }
    $('forgotPassword').disabled = true;
    try {
      const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo: redirectUrl() });
      if (error) throw error;
      setStatus('Jika email terdaftar, tautan pemulihan kata sandi akan dikirim ke email tersebut.');
    } catch (error) {
      setStatus(error.message || 'Tautan pemulihan gagal dikirim.', true);
    } finally { $('forgotPassword').disabled = false; }
  });

  $('signOutButton').addEventListener('click', async () => {
    $('signOutButton').disabled = true;
    const { error } = await client.auth.signOut();
    if (error) setStatus(error.message || 'Gagal keluar dari akun.', true);
    else await setSignedIn(null);
    $('signOutButton').disabled = false;
  });

  $('historyMore').addEventListener('click', loadMore);
  $('clearHistory').addEventListener('click', async (event) => {
    event.preventDefault();
    const message = currentUser
      ? 'Hapus seluruh riwayat QR yang tersimpan di akun ini? Tindakan ini tidak dapat dibatalkan.'
      : 'Hapus riwayat QR sementara di sesi ini?';
    if (!window.confirm(message)) return;
    $('clearHistory').disabled = true;
    try {
      await clearHistory();
      setStatus(currentUser ? 'Riwayat akun berhasil dihapus.' : 'Riwayat sementara berhasil dihapus.');
    } catch (error) {
      setStatus('Riwayat gagal dihapus. Coba lagi.', true);
      console.error('Hapus riwayat QR:', error);
    } finally { $('clearHistory').disabled = false; }
  });

  $('authMode').value = 'login';
  updateAccountUi();
  window.RuangQRCloud = {
    client,
    user: () => currentUser,
    save,
    setMessage: setStatus,
    get hasMore() { return hasMore; },
    get signedIn() { return Boolean(currentUser); }
  };
  client.auth.onAuthStateChange((event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
      recoveryMode = true;
      $('emailInput').disabled = true;
      setStatus('Masukkan kata sandi baru untuk akun Anda.');
      updateAccountUi();
      return;
    }
    if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
      const user = session?.user || null;
      window.setTimeout(() => setSignedIn(user), 0);
    }
  });
})();
