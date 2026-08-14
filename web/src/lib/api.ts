/**
 * SCM Enterprise Portal - Centralized REST API Client
 * Connects Next.js Frontend to PHP Laravel Backend API (http://localhost:8000/api/v1)
 */

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
const cleanUrl = rawApiUrl.replace(/\/+$/, '');
export const API_BASE_URL = cleanUrl.endsWith('/api/v1') ? cleanUrl : `${cleanUrl}/api/v1`;

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('scm_auth_token') || getCookie('scm_auth_token');
}

export function setStoredToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('scm_auth_token', token);
    document.cookie = `scm_auth_token=${token}; path=/; max-age=604800; SameSite=Lax`;
  }
}

export function removeStoredToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('scm_auth_token');
    document.cookie = 'scm_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string; errors?: any }> {
  const token = getStoredToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        message: json.message || `Request failed with status ${res.status}`,
        errors: json.errors,
      };
    }

    return {
      success: true,
      data: json.data !== undefined ? json.data : json,
      message: json.message,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Network error connecting to API server.',
    };
  }
}

// ==========================================
// AUTH API
// ==========================================
export const authApi = {
  async register(data: any) {
    const res = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (res.success && res.data?.token) {
      setStoredToken(res.data.token);
    }
    return res;
  },

  async login(email: string, password: string) {
    const res = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.success && res.data?.token) {
      setStoredToken(res.data.token);
    }
    return res;
  },

  async me() {
    return apiFetch('/auth/me');
  },

  async updateProfile(data: any) {
    return apiFetch('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async logout() {
    const res = await apiFetch('/auth/logout', { method: 'POST' });
    removeStoredToken();
    return res;
  },
};

// ==========================================
// CATALOG API
// ==========================================
export const catalogApi = {
  async getModules() {
    return apiFetch('/catalog');
  },

  async getModuleBySlug(slug: string) {
    return apiFetch(`/catalog/${slug}`);
  },

  async createModule(data: any) {
    return apiFetch('/supreme/modules', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateModule(id: string, data: any) {
    return apiFetch(`/supreme/modules/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteModule(id: string) {
    return apiFetch(`/supreme/modules/${id}`, { method: 'DELETE' });
  },
};

// ==========================================
// ORDERS API
// ==========================================
export const ordersApi = {
  async getCustomerOrders() {
    return apiFetch('/orders');
  },

  async placeOrder(moduleId: string) {
    return apiFetch('/orders', {
      method: 'POST',
      body: JSON.stringify({ module_id: moduleId }),
    });
  },

  async getAdminOrders(status?: string) {
    const endpoint = status ? `/admin/orders?status=${status}` : '/admin/orders';
    return apiFetch(endpoint);
  },

  async approveOrder(orderId: string) {
    return apiFetch(`/admin/orders/${orderId}/approve`, { method: 'POST' });
  },

  async requestDecline(orderId: string, reason: string) {
    return apiFetch(`/admin/orders/${orderId}/request-decline`, {
      method: 'POST',
      body: JSON.stringify({ decline_reason: reason }),
    });
  },
};

// ==========================================
// SUPREME ADMIN API
// ==========================================
export const supremeApi = {
  async getStats() {
    return apiFetch('/supreme/stats');
  },

  async getEscalations() {
    return apiFetch('/supreme/escalations');
  },

  async resolveEscalation(orderId: string, action: 'confirm_decline' | 'reject_decline' | 'force_approve') {
    return apiFetch(`/supreme/escalations/${orderId}/resolve`, {
      method: 'POST',
      body: JSON.stringify({ action }),
    });
  },

  async getStaff() {
    return apiFetch('/supreme/staff');
  },

  async updateStaffRole(userId: number | string, role: string) {
    return apiFetch(`/supreme/staff/${userId}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  },
};

// ==========================================
// PUBLIC TRACKING API
// ==========================================
export const trackingApi = {
  async trackParcel(referenceId: string) {
    return apiFetch(`/track/${referenceId}`);
  },
};

// ==========================================
// EXTENDED DASHBOARD API
// ==========================================
export const dashboardExtApi = {
  // Supreme
  async getSupremeFinance() {
    return apiFetch('/supreme/finance');
  },
  async getSupremeTenants() {
    return apiFetch('/supreme/tenants');
  },
  async getSupremeAuditLogs() {
    return apiFetch('/supreme/audit-logs');
  },
  async getSupremeSystemHealth() {
    return apiFetch('/supreme/system-health');
  },

  // Admin Operations
  async getAdminStats() {
    return apiFetch('/admin/stats');
  },
  async getAdminInventory() {
    return apiFetch('/admin/inventory');
  },
  async getAdminShipments() {
    return apiFetch('/admin/shipments');
  },
  async getAdminSupport() {
    return apiFetch('/admin/support');
  },
  async getAdminAnalytics() {
    return apiFetch('/admin/analytics');
  },

  // Customer Tenant
  async getCustomerBilling() {
    return apiFetch('/customer/billing');
  },
  async getCustomerShipments() {
    return apiFetch('/customer/shipments');
  },
  async getCustomerTeam() {
    return apiFetch('/customer/team');
  },
  async getCustomerIntegrations() {
    return apiFetch('/customer/integrations');
  },
};

