/**
 * OnSpot Part-Time Work Platform - Client Engine
 * Clean, Compact Dashboard with Collapsed Avatar & Profile Drawer
 */

// Category Media Configuration (Local assets with reliable Unsplash fallbacks)
const CATEGORY_MEDIA = {
  Catering: {
    src: "assets/catering.jpg",
    fallback: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    alt: "Catering banquet food buffet"
  },
  Promotions: {
    src: "assets/promotions.jpg",
    fallback: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    alt: "Brand promotion exhibition launch"
  },
  Pamphlet: {
    src: "assets/pamphlet.jpg",
    fallback: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
    alt: "Flyer and pamphlet distribution"
  },
  Ushering: {
    src: "assets/ushering.jpg",
    fallback: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    alt: "VIP ushering & hospitality service"
  },
  Setup: {
    src: "assets/stage.jpg",
    fallback: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80",
    alt: "Stage sound & event setup"
  }
};

function getCategoryMedia(category) {
  return CATEGORY_MEDIA[category] || CATEGORY_MEDIA.Catering;
}

// Known Chennai localities used for manual location selection in the Filter drawer
const KNOWN_LOCALITIES = [
  { name: "Chennai (City Center)", lat: 13.0827, lng: 80.2707 },
  { name: "Adyar", lat: 13.0012, lng: 80.2565 },
  { name: "Guindy", lat: 13.0067, lng: 80.2206 },
  { name: "Velachery", lat: 12.9756, lng: 80.2207 },
  { name: "Nandanam", lat: 13.0332, lng: 80.2422 },
  { name: "Taramani", lat: 12.9889, lng: 80.2444 },
  { name: "Royapettah", lat: 13.0524, lng: 80.2645 }
];

// Haversine distance (in km) between two lat/lng coordinates
function getDistanceKm(lat1, lng1, lat2, lng2) {
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Initial Seed Data for Shifts
const INITIAL_SHIFTS = [
  {
    id: "shift-101",
    category: "Catering",
    categoryDisplay: "Catering Services",
    image: "assets/catering.jpg",
    title: "Wedding Buffet Assistant",
    fullTitle: "Grand Palace Wedding Buffet Service Assistant",
    dealerName: "Royal Feast Banquets",
    dealerRating: 4.9,
    pay: "₹850",
    payType: "Per Shift (5 hrs)",
    rawPay: 850,
    loc: "Adyar, Chennai",
    lat: 13.0012,
    lng: 80.2565,
    durationHours: 5,
    date: "Today, 24 Sept",
    dateType: "today",
    time: "6:00 PM – 11:30 PM",
    slotsTotal: 12,
    slotsFilled: 9,
    urgent: true,
    instantPay: true,
    genderReq: "any",
    perks: ["Dinner Provided", "Overtime Bonus ₹120/hr", "Uniform Provided"],
    requirements: "Black trousers, white plain shirt, neat appearance. Basic banquet manners.",
    dressCode: "Formal White Shirt & Black Trousers",
    description: "Assist with table banquet arrangements, buffet tray replenishment, and cordial hospitality for a 600-guest wedding reception."
  },
  {
    id: "shift-102",
    category: "Promotions",
    categoryDisplay: "Event Promotions",
    image: "assets/promotions.jpg",
    title: "EV Launch Brand Promoter",
    fullTitle: "Flagship EV Tech Launch Brand Promoter",
    dealerName: "Nexus Brand Activations",
    dealerRating: 5.0,
    pay: "₹1,200",
    payType: "Per Shift (7 hrs)",
    rawPay: 1200,
    loc: "Phoenix Marketcity, Velachery",
    lat: 12.9756,
    lng: 80.2207,
    durationHours: 7,
    date: "Tomorrow",
    dateType: "tomorrow",
    time: "11:00 AM – 6:00 PM",
    slotsTotal: 8,
    slotsFilled: 5,
    urgent: false,
    instantPay: true,
    genderReq: "girls",
    perks: ["Branded Tee Given", "Lunch & Snacks Provided", "Certificate Available"],
    requirements: "Good communication skills in English & Tamil. Friendly attitude to explain EV product brochure to walk-in mall visitors.",
    dressCode: "Branded Polo (Provided) with Clean Jeans",
    description: "Engage visitors at the central atrium booth, hand out product brochures, collect feedback on iPad forms."
  },
  {
    id: "shift-103",
    category: "Pamphlet",
    categoryDisplay: "Pamphlet Distribution",
    image: "assets/pamphlet.jpg",
    title: "Morning Flyer Distribution",
    fullTitle: "Metro Station Morning Flyer Distribution",
    dealerName: "Apex Retail Mart",
    dealerRating: 4.7,
    pay: "₹650",
    payType: "Per Shift (3.5 hrs)",
    rawPay: 650,
    loc: "Guindy Metro & Bus Stand",
    lat: 13.0067,
    lng: 80.2206,
    durationHours: 3.5,
    date: "Today, 24 Sept",
    dateType: "today",
    time: "7:00 AM – 10:30 AM",
    slotsTotal: 6,
    slotsFilled: 4,
    urgent: true,
    instantPay: true,
    genderReq: "boys",
    perks: ["Morning Breakfast Provided", "Instant UPI Payout"],
    requirements: "Punctuality is strictly required. Distribute 400 store discount flyers to commuters exiting the station.",
    dressCode: "Casual comfortable clothes and walking shoes",
    description: "Greet morning commuters and hand out weekend discount leaflets for newly opened superstore."
  },
  {
    id: "shift-104",
    category: "Ushering",
    categoryDisplay: "Ushering & VIP Support",
    image: "assets/ushering.jpg",
    title: "Conference VIP Usher",
    fullTitle: "International Medical Conference VIP Usher",
    dealerName: "Global Conclave Planners",
    dealerRating: 4.9,
    pay: "₹1,000",
    payType: "Per Shift (6 hrs)",
    rawPay: 1000,
    loc: "ITC Grand Chola, Guindy",
    lat: 13.0067,
    lng: 80.2206,
    durationHours: 6,
    date: "26 Sept 2026",
    dateType: "upcoming",
    time: "8:30 AM – 2:30 PM",
    slotsTotal: 10,
    slotsFilled: 7,
    urgent: false,
    instantPay: false,
    genderReq: "girls",
    perks: ["Buffet Lunch Included", "ID Badge & Certificate"],
    requirements: "Courteous, fluent spoken English. Escort medical delegates and speakers to lecture halls.",
    dressCode: "Dark Formal Suit / Formal Blazer & Shoes",
    description: "Welcome international delegates, assist with registration QR scanning, and guide attendees to seminar rooms."
  },
  {
    id: "shift-105",
    category: "Setup",
    categoryDisplay: "Stage & Logistics",
    image: "assets/stage.jpg",
    title: "Concert Stage Rigging Assistant",
    fullTitle: "Night Concert Stage & Sound Rigging Assistant",
    dealerName: "VibeStage Sound & Light Co.",
    dealerRating: 4.8,
    pay: "₹900",
    payType: "Night Shift (5 hrs)",
    rawPay: 900,
    loc: "YMCA Grounds, Nandanam",
    lat: 13.0332,
    lng: 80.2422,
    durationHours: 5,
    date: "Night Shift (Tonight)",
    dateType: "today",
    time: "10:30 PM – 3:30 AM",
    slotsTotal: 15,
    slotsFilled: 11,
    urgent: true,
    instantPay: true,
    genderReq: "boys",
    perks: ["Late Night Drop Provided", "Hot Snacks & Tea Included"],
    requirements: "Physical stamina to lift speaker cables and setup stage truss barricades. Safety shoes advised.",
    dressCode: "Black T-Shirt & Cargo Pants / Jeans",
    description: "Assist master technicians in unboxing audio hardware, laying stage cables, and setting VIP seating rows."
  },
  {
    id: "shift-106",
    category: "Catering",
    categoryDisplay: "Catering Services",
    image: "assets/catering.jpg",
    title: "High Tea & Coffee Server",
    fullTitle: "Corporate High Tea Servers & Coffee Barista Helpers",
    dealerName: "Gourmet Hospitality LLP",
    dealerRating: 4.8,
    pay: "₹750",
    payType: "Per Shift (4 hrs)",
    rawPay: 750,
    loc: "Tidel Park, Taramani",
    lat: 12.9889,
    lng: 80.2444,
    durationHours: 4,
    date: "Tomorrow",
    dateType: "tomorrow",
    time: "2:00 PM – 6:00 PM",
    slotsTotal: 8,
    slotsFilled: 3,
    urgent: false,
    instantPay: true,
    perks: ["Snacks & Coffee Provided", "AC Work Environment"],
    requirements: "Clean grooming and hospitality etiquette. Experience in coffee serving preferred.",
    dressCode: "Black Buttoned Shirt & Apron (Provided)",
    description: "Serve gourmet beverages and savory pastry trays for corporate delegates during annual board summit."
  }
];

// Initial Dealer Openings
const INITIAL_DEALER_POSTS = [
  {
    id: "dealer-post-1",
    category: "Catering",
    categoryDisplay: "Catering Services",
    image: "assets/catering.jpg",
    title: "Need 12 Banquet Catering Assistants for Reception",
    dealerName: "Self (Franklin Stanly)",
    dealerRating: 5.0,
    pay: "₹850",
    payType: "Per Shift",
    rawPay: 850,
    loc: "Mayor Ramanathan Hall, MRC Nagar",
    date: "25 Sept 2026",
    dateType: "tomorrow",
    time: "5:30 PM – 11:00 PM",
    slotsTotal: 12,
    slotsFilled: 8,
    urgent: true,
    instantPay: true,
    perks: ["Dinner Provided", "Direct Cash / UPI"],
    requirements: "Polite attitude, dress code: white shirt.",
    dressCode: "White Shirt & Black Trousers",
    description: "Manage 8 buffet counters and serve welcome drinks to guests.",
    applicants: [
      { id: "app-1", name: "Karthik Raja", rating: "4.9", gigs: 32, phone: "+91 98401 23456", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" },
      { id: "app-2", name: "Suresh Menon", rating: "4.8", gigs: 18, phone: "+91 94440 98765", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" }
    ]
  },
  {
    id: "dealer-post-2",
    category: "Promotions",
    categoryDisplay: "Event Promotions",
    image: "assets/promotions.jpg",
    title: "Need 6 Brand Promoters for Weekend Mall Stalls",
    dealerName: "Self (Franklin Stanly)",
    dealerRating: 5.0,
    pay: "₹1,100",
    payType: "Per Shift",
    rawPay: 1100,
    loc: "Express Avenue Mall, Royapettah",
    date: "26 Sept 2026",
    dateType: "upcoming",
    time: "1:00 PM – 8:00 PM",
    slotsTotal: 6,
    slotsFilled: 4,
    urgent: false,
    instantPay: true,
    perks: ["T-shirt Provided", "Snack Allowance"],
    requirements: "Fluent Tamil & conversational English.",
    dressCode: "Smart Casuals",
    description: "Drive consumer engagement for new gaming smartwatch launch.",
    applicants: [
      { id: "app-4", name: "Deepa Lakshmi", rating: "5.0", gigs: 41, phone: "+91 98840 55443", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80" }
    ]
  }
];

// App State
const state = {
  userRole: 'seeker', // 'seeker' | 'dealer'
  shifts: [...INITIAL_SHIFTS],
  dealerPosts: [...INITIAL_DEALER_POSTS],
  appliedJobIds: new Set(),
  appliedJobs: [], // rich application records: { jobId, title, company, location, date, time, salary, status, appliedDate }
  bookmarkedJobIds: new Set(),
  activeCategory: 'All',
  activeFilterChips: new Set(),
  searchQuery: '',
  sortBy: 'recommended',
  userProfile: {
    name: 'Franklin Stanly',
    phone: '+91 98402 88192',
    city: 'Chennai, Tamil Nadu',
    rating: '4.9',
    gigsCompleted: 24,
    upiId: 'franklin@okaxis',
    verified: true,
    photo: null
  },
  isAuthenticated: true,
  completedJobs: [],
  activeModalShift: null,
  // Advanced Filter Drawer state
  advancedFilters: {
    categories: new Set(),   // empty = all categories
    dateFilter: null,        // 'today' | 'tomorrow' | 'upcoming' | null
    salaryMin: null,
    salaryMax: null,
    duration: null,          // 'short' | 'medium' | 'long' | null
    gender: null,            // 'boys' | 'girls' | 'any' | null
    location: null,          // { name, lat, lng } | null
    distanceKm: null
  }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  loadSavedState();
  initEventListeners();
  syncProfileData();
  updateFilterCountBadge();
  renderCategoryTabs();
  renderListings();
});

function loadSavedState() {
  try {
    const savedAppliedJobs = localStorage.getItem('onspot_applied_jobs');
    if (savedAppliedJobs) {
      state.appliedJobs = JSON.parse(savedAppliedJobs);
      state.appliedJobIds = new Set(state.appliedJobs.map(a => a.jobId));
    }
    const savedCompletedJobs = localStorage.getItem('onspot_completed_jobs');
    if (savedCompletedJobs) {
      state.completedJobs = JSON.parse(savedCompletedJobs);
    }
    const savedBookmarks = localStorage.getItem('onspot_bookmarks');
    if (savedBookmarks) {
      state.bookmarkedJobIds = new Set(JSON.parse(savedBookmarks));
    }
    const savedProfile = localStorage.getItem('onspot_profile');
    if (savedProfile) {
      state.userProfile = { ...state.userProfile, ...JSON.parse(savedProfile) };
    }
    const savedAuth = localStorage.getItem('onspot_auth');
    if (savedAuth !== null) {
      state.isAuthenticated = savedAuth === 'true';
    }
  } catch (e) {
    console.warn("Storage sync error:", e);
  }
}

function saveState() {
  try {
    localStorage.setItem('onspot_applied_jobs', JSON.stringify(state.appliedJobs));
    localStorage.setItem('onspot_completed_jobs', JSON.stringify(state.completedJobs));
    localStorage.setItem('onspot_bookmarks', JSON.stringify([...state.bookmarkedJobIds]));
    localStorage.setItem('onspot_profile', JSON.stringify(state.userProfile));
    localStorage.setItem('onspot_auth', state.isAuthenticated);
  } catch (e) {
    console.warn("Storage save error:", e);
  }
}

function syncProfileData() {
  const displayNames = document.querySelectorAll('.display-username');
  displayNames.forEach(el => el.innerText = state.userProfile.name);

  const drawerCity = document.getElementById('drawer-city');
  if (drawerCity) drawerCity.innerText = state.userProfile.city;

  const drawerPhone = document.getElementById('drawer-phone');
  if (drawerPhone) drawerPhone.innerText = state.userProfile.phone;

  const drawerUpi = document.getElementById('drawer-upi');
  if (drawerUpi) drawerUpi.innerText = state.userProfile.upiId;

  const drawerCompleted = document.getElementById('drawer-completed-count');
  if (drawerCompleted) drawerCompleted.innerText = state.userProfile.gigsCompleted;

  const photoUrl = state.userProfile.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80";
  const topNavAvatar = document.getElementById('top-nav-avatar-img');
  const drawerAvatar = document.getElementById('drawer-avatar-img');
  if (topNavAvatar) topNavAvatar.src = photoUrl;
  if (drawerAvatar) drawerAvatar.src = photoUrl;

  const loginBtn = document.getElementById('login-btn-action');
  const logoutBtn = document.getElementById('logout-btn-action');
  if (loginBtn && logoutBtn) {
    if (state.isAuthenticated) {
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'flex';
    } else {
      loginBtn.style.display = 'flex';
      logoutBtn.style.display = 'none';
    }
  }

  renderMyApplications();
}

/* ==========================================================================
   MY APPLICATIONS (Profile Drawer)
   ========================================================================== */
function renderMyApplications() {
  const listEl = document.getElementById('my-applications-list');
  if (!listEl) return;

  if (!state.appliedJobs || state.appliedJobs.length === 0) {
    listEl.innerHTML = `<div class="empty-applications">You haven't applied to any shifts yet. Tap "Quick Apply" on a shift to see it here.</div>`;
    return;
  }

  // Most recently applied first
  const sorted = [...state.appliedJobs].sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));

  listEl.innerHTML = sorted.map(app => {
    const statusClass = `status-${(app.status || 'Applied').toLowerCase().replace(/\s+/g, '-')}`;
    const appliedDateDisplay = new Date(app.appliedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    return `
      <div class="application-item">
        <div class="application-item-top">
          <div>
            <div class="application-title">${app.title}</div>
            <div class="application-company">${app.company}</div>
          </div>
          <span class="application-status-pill ${statusClass}">${app.status || 'Applied'}</span>
        </div>
        <div class="application-meta">
          <span>📍 ${app.location}</span>
          <span>📅 ${app.date}</span>
          <span>⏰ ${app.time}</span>
          <span>💰 ${app.salary}</span>
        </div>
        <div class="application-applied-date">Applied on ${appliedDateDisplay}</div>
      </div>
    `;
  }).join('');

  const completedListEl = document.getElementById('completed-work-list');
  if (completedListEl) {
    if (!state.completedJobs || state.completedJobs.length === 0) {
      completedListEl.innerHTML = `<div class="empty-applications">No completed work yet. Finish gigs to build your profile.</div>`;
    } else {
      completedListEl.innerHTML = state.completedJobs.map(job => `
        <div class="application-item" style="border-left: 3px solid var(--mint-primary);">
          <div class="application-item-top">
            <div>
              <div class="application-title">${job.title}</div>
              <div class="application-company">${job.company}</div>
            </div>
            <span class="application-status-pill status-applied" style="background:var(--mint-subtle); color:var(--mint-primary);">✓ Completed</span>
          </div>
          <div class="application-meta">
            <span>📍 ${job.location}</span>
            <span>💰 ${job.salary}</span>
          </div>
        </div>
      `).join('');
    }
  }
}

/* ==========================================================================
   EVENT LISTENERS
   ========================================================================== */
function initEventListeners() {
  // Live Search Input
  const searchInput = document.getElementById('search-input');
  const clearBtn = document.getElementById('clear-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      if (clearBtn) clearBtn.style.display = state.searchQuery ? 'block' : 'none';
      renderListings();
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      state.searchQuery = '';
      clearBtn.style.display = 'none';
      renderListings();
    });
  }

  // Sort Dropdown
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderListings();
    });
  }

  // Close modals on overlay backdrop click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  // ESC key closes drawer and modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProfileDrawer();
      closeAllModals();
    }
  });
}

/* ==========================================================================
   PROFILE DRAWER (Open/Close with smooth transition)
   ========================================================================== */
function openProfileDrawer() {
  syncProfileData();
  const drawer = document.getElementById('profile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (drawer) drawer.classList.add('open');
  if (backdrop) backdrop.classList.add('open');
}

function closeProfileDrawer() {
  const drawer = document.getElementById('profile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (drawer) drawer.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
}

/* ==========================================================================
   ROLE TOGGLE
   ========================================================================== */
function switchRole(role) {
  state.userRole = role;

  const seekerBtn = document.getElementById('btn-seeker');
  const dealerBtn = document.getElementById('btn-dealer');
  const dealerFab = document.getElementById('dealer-fab');
  const navMyLabel = document.getElementById('top-label-my');
  const userRatingBox = document.getElementById('user-rating-box');

  if (role === 'seeker') {
    if (seekerBtn) seekerBtn.classList.add('active');
    if (dealerBtn) dealerBtn.classList.remove('active');
    if (dealerFab) dealerFab.style.display = 'none';

    if (navMyLabel) navMyLabel.innerText = "My Shifts";
    if (userRatingBox) userRatingBox.innerText = `★ ${state.userProfile.rating} (${state.userProfile.gigsCompleted} Gigs Completed)`;
  } else {
    if (dealerBtn) dealerBtn.classList.add('active');
    if (seekerBtn) seekerBtn.classList.remove('active');
    if (dealerFab) dealerFab.style.display = 'flex';

    if (navMyLabel) navMyLabel.innerText = "Posted Work";
    if (userRatingBox) userRatingBox.innerText = `★ 5.0 (Verified Dealer)`;
  }

  renderCategoryTabs();
  renderListings();
}

/* ==========================================================================
   CATEGORY TABS & BADGES
   ========================================================================== */
const CATEGORIES = [
  { key: 'All', label: 'All Openings' },
  { key: 'Catering', label: 'Catering Services' },
  { key: 'Promotions', label: 'Event Promotions' },
  { key: 'Pamphlet', label: 'Pamphlet Distribution' },
  { key: 'Ushering', label: 'Ushering & VIP' },
  { key: 'Setup', label: 'Stage & Logistics' }
];

function renderCategoryTabs() {
  const tabsContainer = document.getElementById('category-tabs');
  if (!tabsContainer) return;

  const dataset = state.userRole === 'seeker' ? state.shifts : state.dealerPosts;

  tabsContainer.innerHTML = CATEGORIES.map(cat => {
    const count = cat.key === 'All'
      ? dataset.length
      : dataset.filter(i => i.category === cat.key).length;

    const isActive = state.activeCategory === cat.key ? 'active' : '';

    return `
      <div class="cat-tab ${isActive}" onclick="selectCategory('${cat.key}')">
        <span>${cat.label}</span>
        <span class="cat-badge">${count}</span>
      </div>
    `;
  }).join('');
}

function selectCategory(categoryKey) {
  state.activeCategory = categoryKey;
  renderCategoryTabs();
  renderListings();
}

/* ==========================================================================
   FILTER CHIPS
   ========================================================================== */
function toggleFilterChip(chipKey, element) {
  if (state.activeFilterChips.has(chipKey)) {
    state.activeFilterChips.delete(chipKey);
    element.classList.remove('active');
  } else {
    state.activeFilterChips.add(chipKey);
    element.classList.add('active');
  }
  renderListings();
}

/* ==========================================================================
   ADVANCED FILTER DRAWER
   ========================================================================== */

// Working copy of filters edited inside the drawer, committed on "Apply Filters"
let draftFilters = null;

function openFilterModal() {
  // Start the draft from the currently applied filters
  draftFilters = {
    categories: new Set(state.advancedFilters.categories),
    dateFilter: state.advancedFilters.dateFilter,
    duration: state.advancedFilters.duration,
    gender: state.advancedFilters.gender,
    location: state.advancedFilters.location,
    distanceKm: state.advancedFilters.distanceKm
  };

  // Category checkboxes
  const catGroup = document.getElementById('filter-category-group');
  if (catGroup) {
    catGroup.innerHTML = CATEGORIES.filter(c => c.key !== 'All').map(cat => `
      <button class="filter-option-btn ${draftFilters.categories.has(cat.key) ? 'active' : ''}"
        data-category="${cat.key}" onclick="toggleCategoryFilter('${cat.key}', this)">${cat.label}</button>
    `).join('');
  }

  // Locality quick-select buttons
  const localityRow = document.getElementById('filter-locality-row');
  if (localityRow) {
    localityRow.innerHTML = KNOWN_LOCALITIES.map(loc => `
      <button class="filter-option-btn ${draftFilters.location && draftFilters.location.name === loc.name ? 'active' : ''}"
        onclick="selectLocality('${loc.name}')">${loc.name}</button>
    `).join('');
  }

  // Restore existing selections in the option groups
  document.querySelectorAll('#filter-date-group .filter-option-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.date === draftFilters.dateFilter);
  });
  document.querySelectorAll('#filter-distance-group .filter-option-btn').forEach(btn => {
    btn.classList.toggle('active', Number(btn.dataset.distance) === draftFilters.distanceKm);
  });
  document.querySelectorAll('#filter-duration-group .filter-option-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.duration === draftFilters.duration);
  });
  document.querySelectorAll('#filter-gender-group .filter-option-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.gender === draftFilters.gender);
  });

  const salaryMinInput = document.getElementById('filter-salary-min');
  const salaryMaxInput = document.getElementById('filter-salary-max');
  if (salaryMinInput) salaryMinInput.value = state.advancedFilters.salaryMin ?? '';
  if (salaryMaxInput) salaryMaxInput.value = state.advancedFilters.salaryMax ?? '';

  updateLocationActiveLabel();

  const modal = document.getElementById('filter-modal');
  if (modal) modal.classList.add('open');
}

function toggleCategoryFilter(categoryKey, element) {
  if (draftFilters.categories.has(categoryKey)) {
    draftFilters.categories.delete(categoryKey);
    element.classList.remove('active');
  } else {
    draftFilters.categories.add(categoryKey);
    element.classList.add('active');
  }
}

function setDateFilter(value, element) {
  draftFilters.dateFilter = draftFilters.dateFilter === value ? null : value;
  document.querySelectorAll('#filter-date-group .filter-option-btn').forEach(btn => btn.classList.remove('active'));
  if (draftFilters.dateFilter) element.classList.add('active');
}

function setDistanceFilter(km, element) {
  draftFilters.distanceKm = draftFilters.distanceKm === km ? null : km;
  document.querySelectorAll('#filter-distance-group .filter-option-btn').forEach(btn => btn.classList.remove('active'));
  if (draftFilters.distanceKm) element.classList.add('active');
}

function setDurationFilter(value, element) {
  draftFilters.duration = draftFilters.duration === value ? null : value;
  document.querySelectorAll('#filter-duration-group .filter-option-btn').forEach(btn => btn.classList.remove('active'));
  if (draftFilters.duration) element.classList.add('active');
}

function setGenderFilter(value, element) {
  draftFilters.gender = draftFilters.gender === value ? null : value;
  document.querySelectorAll('#filter-gender-group .filter-option-btn').forEach(btn => btn.classList.remove('active'));
  if (draftFilters.gender) element.classList.add('active');
}

function selectLocality(name) {
  const loc = KNOWN_LOCALITIES.find(l => l.name === name);
  if (!loc) return;
  draftFilters.location = { name: loc.name, lat: loc.lat, lng: loc.lng };
  document.querySelectorAll('#filter-locality-row .filter-option-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim() === name);
  });
  updateLocationActiveLabel();
}

function requestNearMe() {
  if (!navigator.geolocation) {
    showToast("Location access isn't available on this device. Please pick a locality manually.");
    return;
  }
  const btn = document.getElementById('btn-near-me');
  if (btn) btn.textContent = 'Detecting your location...';

  navigator.geolocation.getCurrentPosition(
    (position) => {
      draftFilters.location = {
        name: 'Near Me',
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      document.querySelectorAll('#filter-locality-row .filter-option-btn').forEach(btn => btn.classList.remove('active'));
      updateLocationActiveLabel();
      resetNearMeButton();
    },
    () => {
      showToast("Location permission denied. Please choose a locality from the list instead.");
      resetNearMeButton();
    },
    { enableHighAccuracy: false, timeout: 8000 }
  );
}

function resetNearMeButton() {
  const btn = document.getElementById('btn-near-me');
  if (btn) {
    btn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </svg>
      Use My Current Location
    `;
  }
}

function updateLocationActiveLabel() {
  const labelWrap = document.getElementById('filter-location-active');
  const labelText = document.getElementById('filter-location-active-text');
  if (!labelWrap || !labelText) return;
  if (draftFilters && draftFilters.location) {
    labelText.textContent = `Using: ${draftFilters.location.name}`;
    labelWrap.classList.add('show');
  } else {
    labelWrap.classList.remove('show');
  }
}

function applyAdvancedFilters() {
  const salaryMinInput = document.getElementById('filter-salary-min');
  const salaryMaxInput = document.getElementById('filter-salary-max');

  state.advancedFilters = {
    categories: new Set(draftFilters.categories),
    dateFilter: draftFilters.dateFilter,
    salaryMin: salaryMinInput && salaryMinInput.value !== '' ? Number(salaryMinInput.value) : null,
    salaryMax: salaryMaxInput && salaryMaxInput.value !== '' ? Number(salaryMaxInput.value) : null,
    duration: draftFilters.duration,
    gender: draftFilters.gender,
    location: draftFilters.location,
    // Default to a sensible 10km radius if a location was chosen but no distance picked
    distanceKm: draftFilters.location ? (draftFilters.distanceKm || 10) : draftFilters.distanceKm
  };

  updateFilterCountBadge();
  closeAllModals();
  renderListings();
  showToast("Filters applied!");
}

function clearAllAdvancedFilters() {
  state.advancedFilters = {
    categories: new Set(),
    dateFilter: null,
    salaryMin: null,
    salaryMax: null,
    duration: null,
    gender: null,
    location: null,
    distanceKm: null
  };
  draftFilters = {
    categories: new Set(),
    dateFilter: null,
    duration: null,
    gender: null,
    location: null,
    distanceKm: null
  };
  document.querySelectorAll('#filter-modal .filter-option-btn').forEach(btn => btn.classList.remove('active'));
  const salaryMinInput = document.getElementById('filter-salary-min');
  const salaryMaxInput = document.getElementById('filter-salary-max');
  if (salaryMinInput) salaryMinInput.value = '';
  if (salaryMaxInput) salaryMaxInput.value = '';
  updateLocationActiveLabel();
  updateFilterCountBadge();
  renderListings();
  showToast("All filters cleared.");
}

function updateFilterCountBadge() {
  const af = state.advancedFilters;
  let count = 0;
  if (af.categories.size > 0) count++;
  if (af.dateFilter) count++;
  if (af.salaryMin != null || af.salaryMax != null) count++;
  if (af.duration) count++;
  if (af.gender) count++;
  if (af.location) count++;

  const badge = document.getElementById('filter-count-badge');
  const filterBtn = document.getElementById('btn-open-filter');
  if (badge) {
    badge.textContent = count;
    badge.classList.toggle('show', count > 0);
  }
  if (filterBtn) {
    filterBtn.classList.toggle('has-active', count > 0);
  }
}

/* ==========================================================================
   RENDER LISTINGS (CARDS)
   ========================================================================== */
function renderListings() {
  const box = document.getElementById('listings-container');
  const countBadge = document.getElementById('listings-count-badge');
  const sectionTitle = document.getElementById('section-title-text');
  if (!box) return;

  const dataset = state.userRole === 'seeker' ? state.shifts : state.dealerPosts;

  // Filter by Category
  let filtered = state.activeCategory === 'All'
    ? dataset
    : dataset.filter(item => item.category === state.activeCategory);

  // Filter by Search Query
  if (state.searchQuery) {
    filtered = filtered.filter(item => {
      const target = `${item.title} ${item.loc} ${item.category} ${item.dealerName} ${(item.perks || []).join(' ')}`.toLowerCase();
      return target.includes(state.searchQuery);
    });
  }

  // Filter by Active Chips
  if (state.activeFilterChips.size > 0) {
    if (state.activeFilterChips.has('today')) {
      filtered = filtered.filter(item => item.dateType === 'today');
    }
    if (state.activeFilterChips.has('highpay')) {
      filtered = filtered.filter(item => (item.rawPay || 0) >= 800);
    }
    if (state.activeFilterChips.has('instant')) {
      filtered = filtered.filter(item => item.instantPay === true);
    }
    if (state.activeFilterChips.has('urgent')) {
      filtered = filtered.filter(item => item.urgent === true);
    }
    if (state.activeFilterChips.has('meals')) {
      filtered = filtered.filter(item => (item.perks || []).some(p =>
        p.toLowerCase().includes('dinner') ||
        p.toLowerCase().includes('lunch') ||
        p.toLowerCase().includes('food') ||
        p.toLowerCase().includes('snack') ||
        p.toLowerCase().includes('breakfast')
      ));
    }
    if (state.activeFilterChips.has('boys')) {
      filtered = filtered.filter(item => item.genderReq === 'boys' || item.genderReq === 'any' || !item.genderReq);
    }
    if (state.activeFilterChips.has('girls')) {
      filtered = filtered.filter(item => item.genderReq === 'girls' || item.genderReq === 'any' || !item.genderReq);
    }
  }

  // Filter by the Advanced Filter Drawer
  const af = state.advancedFilters;

  if (af.categories.size > 0) {
    filtered = filtered.filter(item => af.categories.has(item.category));
  }

  if (af.dateFilter) {
    filtered = filtered.filter(item => item.dateType === af.dateFilter);
  }

  if (af.salaryMin != null && !Number.isNaN(af.salaryMin)) {
    filtered = filtered.filter(item => (item.rawPay || 0) >= af.salaryMin);
  }
  if (af.salaryMax != null && !Number.isNaN(af.salaryMax)) {
    filtered = filtered.filter(item => (item.rawPay || 0) <= af.salaryMax);
  }

  if (af.duration) {
    filtered = filtered.filter(item => {
      const h = item.durationHours;
      if (h == null) return true; // don't exclude items without duration data
      if (af.duration === 'short') return h < 4;
      if (af.duration === 'medium') return h >= 4 && h <= 6;
      if (af.duration === 'long') return h > 6;
      return true;
    });
  }

  if (af.gender && af.gender !== 'any') {
    filtered = filtered.filter(item => item.genderReq === af.gender || item.genderReq === 'any' || !item.genderReq);
  }

  // Location / Distance: attach a computed distance to each item, filter and sort by it
  let usingDistanceSort = false;
  if (af.location && af.distanceKm) {
    filtered = filtered
      .map(item => {
        if (item.lat != null && item.lng != null) {
          return { ...item, distanceKm: getDistanceKm(af.location.lat, af.location.lng, item.lat, item.lng) };
        }
        return { ...item, distanceKm: null };
      })
      .filter(item => item.distanceKm == null || item.distanceKm <= af.distanceKm);
    usingDistanceSort = true;
  }

  // Sort
  if (usingDistanceSort) {
    filtered.sort((a, b) => {
      if (a.distanceKm == null) return 1;
      if (b.distanceKm == null) return -1;
      return a.distanceKm - b.distanceKm;
    });
  } else if (state.sortBy === 'pay_desc') {
    filtered.sort((a, b) => (b.rawPay || 0) - (a.rawPay || 0));
  } else if (state.sortBy === 'slots_open') {
    filtered.sort((a, b) => (b.slotsTotal - b.slotsFilled) - (a.slotsTotal - a.slotsFilled));
  } else if (state.sortBy === 'rating') {
    filtered.sort((a, b) => b.dealerRating - a.dealerRating);
  }

  // Update Section Header Counts
  if (countBadge) countBadge.innerText = `${filtered.length} Openings`;
  if (sectionTitle) {
    sectionTitle.innerText = state.userRole === 'seeker' ? 'Available Shift Openings' : 'Your Published Requirements';
  }

  // Empty State
  if (filtered.length === 0) {
    box.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 50px 20px; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-subtle);">
        <div style="font-size: 36px; margin-bottom: 10px;">🔍</div>
        <h4 style="font-size: 17px; font-weight: 800; color: var(--text-primary); margin-bottom: 4px;">No matching shifts found</h4>
        <p style="font-size: 13px; color: var(--text-muted); max-width: 360px; margin: 0 auto 16px auto;">Try clearing search keywords or active filter chips to discover more available gigs.</p>
        <button class="btn-action-primary" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  // Render cards
  box.innerHTML = filtered.map(item => {
    const isApplied = state.appliedJobIds.has(item.id);
    const isBookmarked = state.bookmarkedJobIds.has(item.id);
    const slotsRemaining = item.slotsTotal - item.slotsFilled;
    const progressPercent = Math.round((item.slotsFilled / item.slotsTotal) * 100);
    const media = getCategoryMedia(item.category);
    const itemImg = item.image || media.src;
    const itemFallback = media.fallback;

    const perksHtml = (item.perks || []).slice(0, 2).map(p => `
      <span class="perk-pill">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        ${p}
      </span>
    `).join('');

    return `
      <div class="shift-card" id="card-${item.id}">
        <!-- Top Category Image Header with Overlaid Badges (Matches Reference Design) -->
        <div class="card-image-wrap">
          <img 
            src="${itemImg}" 
            alt="${media.alt || item.title}" 
            class="card-img" 
            loading="lazy"
            onerror="this.onerror=null; this.src='${itemFallback}';"
          >
          <div class="card-image-overlay"></div>
          
          <div class="card-image-top-bar">
            <span class="category-tag on-image">
              <span class="category-tag-dot"></span>
              ${item.categoryDisplay || item.category}
            </span>
            <div class="card-actions-top on-image">
              ${item.genderReq === 'boys' ? `<span class="gender-badge on-image boys-only">♂ Boys Only</span>` : ''}
              ${item.genderReq === 'girls' ? `<span class="gender-badge on-image girls-only">♀ Girls Only</span>` : ''}
              ${item.urgent ? `<span class="urgent-badge on-image">🔥 Urgent</span>` : ''}
              <button class="btn-bookmark on-image ${isBookmarked ? 'bookmarked' : ''}" onclick="toggleBookmark('${item.id}', this)" title="Save for later" aria-label="Bookmark shift">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Card Body Details (Keeps all existing layout & functionality) -->
        <div class="card-body">
          <div class="card-title" onclick="openShiftDetails('${item.id}')" title="${item.fullTitle || item.title}">${item.title}</div>

          <div class="perks-row">
            ${perksHtml}
          </div>

          <div class="card-info-list">
            <div class="info-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span title="${item.loc}"><strong>${item.loc}</strong>${item.distanceKm != null ? ` • ${item.distanceKm.toFixed(1)} km away` : ''}</span>
            </div>
            <div class="info-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              <span>${item.date}</span>
            </div>
            <div class="info-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>${item.time}</span>
            </div>
          </div>

          <div class="slots-bar-wrapper">
            <div class="slots-bar-header">
              <span>Slots Availability</span>
              <span style="color:var(--mint-primary);">${slotsRemaining} spots left (${item.slotsFilled}/${item.slotsTotal})</span>
            </div>
            <div class="slots-progress-track">
              <div class="slots-progress-fill" style="width: ${progressPercent}%;"></div>
            </div>
          </div>

          <div class="card-footer">
            <div class="pay-container">
              <div class="pay-amount">${item.pay}</div>
              <div class="pay-type">${item.payType || 'Guaranteed Pay'}</div>
            </div>

            <div class="card-btn-group">
              <button class="btn-details" onclick="openShiftDetails('${item.id}')">Details</button>
              ${state.userRole === 'seeker' ? `
                <button 
                  class="btn-action-primary ${isApplied ? 'applied' : ''}" 
                  onclick="handleApplyClick('${item.id}')"
                  id="apply-btn-${item.id}"
                >
                  ${isApplied ? '✓ Applied' : 'Quick Apply'}
                </button>
              ` : `
                <button class="btn-action-primary" onclick="openManageApplicantsModal('${item.id}')">
                  Manage (${item.applicants ? item.applicants.length : 0})
                </button>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   WORKFLOWS & MODALS
   ========================================================================== */
function resetFilters() {
  state.activeCategory = 'All';
  state.searchQuery = '';
  state.activeFilterChips.clear();
  state.advancedFilters = {
    categories: new Set(),
    dateFilter: null,
    salaryMin: null,
    salaryMax: null,
    duration: null,
    gender: null,
    location: null,
    distanceKm: null
  };
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  updateFilterCountBadge();
  renderCategoryTabs();
  renderListings();
}

function toggleBookmark(jobId, element) {
  if (state.bookmarkedJobIds.has(jobId)) {
    state.bookmarkedJobIds.delete(jobId);
    element.classList.remove('bookmarked');
    showToast("Shift removed from bookmarks");
  } else {
    state.bookmarkedJobIds.add(jobId);
    element.classList.add('bookmarked');
    showToast("Shift saved to bookmarks ❤️");
  }
  saveState();
}

function handleApplyClick(jobId) {
  if (state.appliedJobIds.has(jobId)) {
    showToast("You have already submitted your application for this shift!");
    return;
  }
  openShiftDetails(jobId, true);
}

function openShiftDetails(jobId, autoFocusApply = false) {
  const allShifts = [...state.shifts, ...state.dealerPosts];
  const item = allShifts.find(s => s.id === jobId);
  if (!item) return;

  state.activeModalShift = item;
  const modal = document.getElementById('details-modal');
  const content = document.getElementById('details-modal-content');
  if (!modal || !content) return;

  const isApplied = state.appliedJobIds.has(item.id);
  const media = getCategoryMedia(item.category);
  const itemImg = item.image || media.src;
  const itemFallback = media.fallback;

  content.innerHTML = `
    <div style="width:100%; height:160px; border-radius:var(--radius-md); overflow:hidden; margin-bottom:16px; position:relative; background:#09130e;">
      <img src="${itemImg}" alt="${item.title}" style="width:100%; height:100%; object-fit:cover; display:block;" onerror="this.onerror=null; this.src='${itemFallback}';">
      <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(14,24,19,0.85) 100%);"></div>
      <div style="position:absolute; bottom:12px; left:14px;">
        <span class="category-tag on-image">${item.categoryDisplay || item.category}</span>
      </div>
    </div>

    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
      <div>
        <h2 style="font-size:19px; font-weight:800; color:var(--text-primary); margin-top:4px;">${item.fullTitle || item.title}</h2>
        <div style="font-size:12.5px; color:var(--text-muted); margin-top:4px;">Posted by <strong>${item.dealerName}</strong> (★ ${item.dealerRating})</div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:22px; font-weight:800; color:var(--mint-primary); font-family:'Space Grotesk'">${item.pay}</div>
        <div style="font-size:11px; color:var(--text-muted);">${item.payType || 'Per Shift'}</div>
      </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:12px; margin-bottom:16px;">
      <div class="info-item">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        <div>
          <div style="font-size:10px; color:var(--text-muted); text-transform:uppercase;">Venue Location</div>
          <div style="font-weight:700; color:var(--text-primary);">${item.loc}</div>
        </div>
      </div>
      <div class="info-item">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <div>
          <div style="font-size:10px; color:var(--text-muted); text-transform:uppercase;">Timing & Date</div>
          <div style="font-weight:700; color:var(--text-primary);">${item.date} • ${item.time}</div>
        </div>
      </div>
    </div>

    <div style="margin-bottom:14px;">
      <h4 style="font-size:12px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; margin-bottom:5px;">Role Description</h4>
      <p style="font-size:13.5px; color:var(--text-primary); line-height:1.55;">${item.description || 'Assisting venue leads with guests hospitality, counter coordination, and cordial service.'}</p>
    </div>

    <div style="margin-bottom:14px;">
      <h4 style="font-size:12px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; margin-bottom:5px;">Requirements & Dress Code</h4>
      <div style="padding:10px 12px; background:rgba(0, 245, 155, 0.05); border-left:3px solid var(--mint-primary); border-radius:4px; font-size:12.5px; color:var(--text-primary);">
        👔 <strong>Dress Code:</strong> ${item.dressCode || 'Smart formals'}<br>
        📋 <strong>Criteria:</strong> ${item.requirements || 'Punctuality and neat grooming.'}
      </div>
    </div>

    <div style="margin-bottom:18px;">
      <h4 style="font-size:12px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; margin-bottom:6px;">Perks & Facilities</h4>
      <div class="perks-row">
        ${(item.perks || []).map(p => `<span class="perk-pill" style="padding:4px 10px;">✨ ${p}</span>`).join('')}
      </div>
    </div>

    <div style="display:flex; gap:10px; margin-top:16px; border-top:1px solid var(--border-subtle); padding-top:14px;">
      <button class="btn-details" onclick="closeAllModals()" style="flex:1; padding:10px;">Close</button>
      ${state.userRole === 'seeker' ? `
        <button 
          class="btn-action-primary ${isApplied ? 'applied' : ''}" 
          style="flex:2; justify-content:center; padding:11px;"
          onclick="${isApplied ? '' : `openPaymentModal('${item.id}')`}"
          ${isApplied ? 'disabled' : ''}
        >
          ${isApplied ? '✓ Application Confirmed' : 'Continue to Payment'}
        </button>
      ` : `
        <button class="btn-action-primary" style="flex:2; justify-content:center;" onclick="closeAllModals(); openManageApplicantsModal('${item.id}')">
          View Current Applicants
        </button>
      `}
    </div>
  `;

  modal.classList.add('open');
}

function confirmApply(jobId) {
  // Prevent duplicate applications to the same job
  if (state.appliedJobIds.has(jobId)) {
    showToast("You have already submitted your application for this shift!");
    closeAllModals();
    return;
  }

  const allShifts = [...state.shifts, ...state.dealerPosts];
  const job = allShifts.find(s => s.id === jobId);
  if (!job) return;

  state.appliedJobIds.add(jobId);
  state.appliedJobs.push({
    jobId: job.id,
    title: job.title,
    company: job.dealerName,
    location: job.loc,
    date: job.date,
    time: job.time,
    salary: job.pay,
    status: 'Applied',
    appliedDate: new Date().toISOString(),
    appliedBy: state.userProfile.name
  });

  saveState();
  closeAllModals();
  renderListings();
  renderMyApplications();
  showToast("Application submitted! Dealer will contact you via WhatsApp/SMS.");
}

/* ==========================================================================
   DEALER POST WORK MODAL
   ========================================================================== */
function openPostModal() {
  const modal = document.getElementById('post-modal');
  if (modal) modal.classList.add('open');
}

function closePostModal() {
  const modal = document.getElementById('post-modal');
  if (modal) modal.classList.remove('open');
}

function handlePostSubmit(e) {
  e.preventDefault();

  const category = document.getElementById('post-category').value;
  const slots = parseInt(document.getElementById('post-slots').value, 10) || 5;
  const pay = document.getElementById('post-pay').value.trim();
  const phone = document.getElementById('post-phone') ? document.getElementById('post-phone').value.trim() : state.userProfile.phone;
  const date = document.getElementById('post-date').value.trim() || "Tomorrow";
  const time = document.getElementById('post-time').value.trim() || "6:00 PM – 11:00 PM";
  const loc = document.getElementById('post-loc').value.trim();
  const details = document.getElementById('post-details') ? document.getElementById('post-details').value.trim() : '';

  const title = `Need ${slots} ${category === 'Catering' ? 'Catering Servers' : category + ' Staff'} at ${loc.split(',')[0]}`;
  const formattedPay = pay.startsWith('₹') ? pay : `₹${pay}`;

  const newOpening = {
    id: `shift-custom-${Date.now()}`,
    category: category,
    categoryDisplay: category === 'Catering' ? 'Catering Services' : category,
    image: getCategoryMedia(category).src,
    title: title,
    dealerName: state.userProfile.name,
    dealerRating: 5.0,
    pay: formattedPay.includes('/') ? formattedPay : `${formattedPay} / Shift`,
    payType: "Per Shift",
    rawPay: parseInt(pay.replace(/[^0-9]/g, ''), 10) || 800,
    loc: loc,
    date: date,
    dateType: 'upcoming',
    time: time,
    slotsTotal: slots,
    slotsFilled: 0,
    urgent: true,
    instantPay: true,
    perks: ["Snacks/Dinner Included", "Direct UPI Payment"],
    requirements: "Punctuality and active participation.",
    dressCode: "Formals / Smart Casuals",
    description: details || `Work requirement posted by ${state.userProfile.name}. Need ${slots} reliable workers for ${category}. Contact: ${phone}`,
    phone: phone,
    applicants: []
  };

  // Add to both dealer and public seeker listing
  state.dealerPosts.unshift(newOpening);
  state.shifts.unshift(newOpening);

  closePostModal();
  e.target.reset();
  renderCategoryTabs();
  renderListings();
  showToast("Work requirement posted successfully! 🚀");
}

/* ==========================================================================
   DEALER MANAGE APPLICANTS MODAL
   ========================================================================== */
function openManageApplicantsModal(postId) {
  const post = state.dealerPosts.find(p => p.id === postId) || state.shifts.find(s => s.id === postId);
  if (!post) return;

  const modal = document.getElementById('manage-modal');
  const titleElem = document.getElementById('manage-post-title');
  const listElem = document.getElementById('manage-applicants-list');

  titleElem.innerText = post.title;

  const applicants = post.applicants || [
    { id: "app-default-1", name: "Ravi Shankar", rating: "4.9", gigs: 19, phone: "+91 98841 12345", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" },
    { id: "app-default-2", name: "Priya Sundaram", rating: "5.0", gigs: 28, phone: "+91 94443 67890", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" }
  ];

  if (applicants.length === 0) {
    listElem.innerHTML = `
      <div style="text-align:center; padding:30px; color:var(--text-muted);">
        No seekers applied yet. Your opening is live in the search feed.
      </div>
    `;
  } else {
    listElem.innerHTML = applicants.map(app => `
      <div class="applicant-item" id="app-row-${app.id}">
        <div class="applicant-info">
          <img src="${app.avatar}" class="applicant-avatar" alt="${app.name}">
          <div>
            <div class="applicant-name">${app.name}</div>
            <div class="applicant-sub">★ ${app.rating} (${app.gigs} Gigs Completed) • ${app.phone}</div>
          </div>
        </div>
        <div class="applicant-actions">
          <button class="btn-accept" onclick="acceptApplicant('${app.id}', '${app.name}')">Accept & Hire</button>
          <button class="btn-decline" onclick="declineApplicant('${app.id}')">Decline</button>
        </div>
      </div>
    `).join('');
  }

  modal.classList.add('open');
}

function acceptApplicant(appId, name) {
  const row = document.getElementById(`app-row-${appId}`);
  if (row) {
    row.innerHTML = `
      <div style="color:var(--mint-primary); font-weight:700; font-size:12.5px; padding:8px 0; display:flex; justify-content:space-between; align-items:center; width: 100%;">
        <span>✓ ${name} Hired!</span>
        <div style="display:flex; gap:6px;">
          <button class="btn-action-primary" style="padding: 4px 10px; font-size: 11px;" onclick="openLocationTracker('${name}')">Track</button>
          <button class="btn-cancel" style="padding: 4px 10px; font-size: 11px; border:1px solid var(--mint-primary); color:var(--mint-primary);" onclick="markShiftCompleted('${appId}', '${name}', this)">Complete</button>
        </div>
      </div>
    `;
  }
  showToast(`Accepted ${name}! Shift confirmed.`);
}

function declineApplicant(appId) {
  const row = document.getElementById(`app-row-${appId}`);
  if (row) row.remove();
  showToast("Applicant declined.");
}

function markShiftCompleted(appId, name, btn) {
  if (btn) {
    btn.innerText = "Completed ✓";
    btn.disabled = true;
    btn.style.color = "var(--text-muted)";
    btn.style.borderColor = "var(--border-subtle)";
  }
  showToast(`Shift marked as completed for ${name}. Payout triggered.`);
}

/* ==========================================================================
   USER PROFILE SETUP MODAL
   ========================================================================== */
function openProfileSetup() {
  document.getElementById('profile-name-input').value = state.userProfile.name;
  document.getElementById('profile-phone-input').value = state.userProfile.phone;
  document.getElementById('profile-city-input').value = state.userProfile.city;
  document.getElementById('profile-upi-input').value = state.userProfile.upiId || 'franklin@upi';
  document.getElementById('profile-modal').classList.add('open');
}

function handleProfileSave(e) {
  e.preventDefault();
  state.userProfile.name = document.getElementById('profile-name-input').value.trim();
  state.userProfile.phone = document.getElementById('profile-phone-input').value.trim();
  state.userProfile.city = document.getElementById('profile-city-input').value.trim();
  state.userProfile.upiId = document.getElementById('profile-upi-input').value.trim();

  saveState();
  syncProfileData();
  closeAllModals();
  showToast("Profile credentials updated successfully! 👤");
}

/* ==========================================================================
   TOAST & UTILITIES
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('global-toast');
  const msgEl = document.getElementById('toast-text');
  if (!toast || !msgEl) return;

  msgEl.innerText = message;
  toast.classList.add('show');

  clearTimeout(window.__toastTimeout);
  window.__toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('open');
  });
  
  // Clean up camera if closing camera modal
  if (cameraStream) {
    cameraStream.getTracks().forEach(t => t.stop());
    cameraStream = null;
  }
}

/* ==========================================================================
   SUPPORT CENTER LOGIC
   ========================================================================== */
function openSupportCenter() {
  document.getElementById('support-modal').classList.add('open');
  // Populate jobs dropdown
  const select = document.getElementById('support-job-select');
  if (select) {
    select.innerHTML = '<option value="">Select Job</option>' + 
      state.appliedJobs.map(job => `<option value="${job.jobId}">${job.title} at ${job.company}</option>`).join('');
  }
}

function handleSupportSubmit(e) {
  e.preventDefault();
  closeAllModals();
  showToast(`Your complaint has been submitted successfully. Ticket ID: ONSPOT-${Math.floor(Math.random()*90000) + 10000}`);
  e.target.reset();
}

/* ==========================================================================
   PAYMENT LOGIC
   ========================================================================== */
let pendingPaymentJobId = null;

function openPaymentModal(jobId) {
  if (!state.isAuthenticated) {
    showToast("Please login before applying.");
    openLoginModal();
    return;
  }
  closeAllModals();
  pendingPaymentJobId = jobId;
  const job = [...state.shifts, ...state.dealerPosts].find(s => s.id === jobId);
  if (job) {
    document.getElementById('payment-amount-display').innerText = job.pay;
    document.getElementById('payment-modal').classList.add('open');
  }
}

function togglePaymentFields() {
  const method = document.getElementById('payment-method-select').value;
  document.getElementById('payment-upi-fields').style.display = method === 'upi' ? 'block' : 'none';
  document.getElementById('payment-card-fields').style.display = method === 'card' ? 'block' : 'none';
}

function processPayment() {
  const btn = document.querySelector('#payment-modal .btn-action-primary');
  const originalText = btn.innerText;
  btn.innerText = 'Processing...';
  btn.disabled = true;

  // Simulate payment processing
  setTimeout(() => {
    btn.innerText = originalText;
    btn.disabled = false;
    showToast("Payment Successful! Application Submitted.");
    
    // Proceed to application submission
    if (pendingPaymentJobId) {
      confirmApply(pendingPaymentJobId);
      pendingPaymentJobId = null;
    }
  }, 1500);
}

/* ==========================================================================
   CAMERA & FACE DETECTION MOCK
   ========================================================================== */
let cameraStream = null;
let detectionInterval = null;
let isFaceDetected = false;

function openCameraModal() {
  closeAllModals();
  document.getElementById('camera-modal').classList.add('open');
  
  const video = document.getElementById('camera-video');
  const status = document.getElementById('camera-status-text');
  const btnCapture = document.getElementById('btn-capture-photo');
  const preview = document.getElementById('camera-preview-img');
  
  video.style.display = 'block';
  preview.style.display = 'none';
  document.getElementById('camera-action-buttons').style.display = 'flex';
  document.getElementById('camera-confirm-buttons').style.display = 'none';
  document.getElementById('face-guide-overlay').style.display = 'block';

  // Ask for camera permission
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      cameraStream = stream;
      video.srcObject = stream;
      status.innerText = "Position your face inside the guide";
      btnCapture.disabled = true;

      // Mock Face Detection loop
      let scanCount = 0;
      detectionInterval = setInterval(() => {
        scanCount++;
        const states = [
          "Move slightly left",
          "Move slightly right",
          "Center your face",
          "Face detected ✓",
          "Face detected ✓",
          "Ready to capture"
        ];
        
        // Emulate realistic finding sequence
        if (scanCount < 2) {
          status.innerText = states[0];
          document.getElementById('face-guide-overlay').style.borderColor = "rgba(255,255,255,0.4)";
        } else if (scanCount < 4) {
          status.innerText = states[2];
        } else {
          status.innerText = "Ready to capture";
          status.style.color = "var(--mint-primary)";
          document.getElementById('face-guide-overlay').style.borderColor = "var(--mint-primary)";
          btnCapture.disabled = false;
          isFaceDetected = true;
          clearInterval(detectionInterval);
        }
      }, 800);

    }).catch(err => {
      console.error(err);
      status.innerText = "Camera permission denied or unavailable.";
      btnCapture.disabled = true;
    });
  } else {
    status.innerText = "Camera not supported on this browser.";
  }
}

function capturePhoto() {
  if (!isFaceDetected) {
    showToast("No face detected yet.");
    return;
  }
  
  const video = document.getElementById('camera-video');
  const canvas = document.getElementById('camera-canvas');
  const preview = document.getElementById('camera-preview-img');
  
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  
  const imgUrl = canvas.toDataURL('image/jpeg');
  preview.src = imgUrl;
  
  video.style.display = 'none';
  preview.style.display = 'block';
  document.getElementById('face-guide-overlay').style.display = 'none';
  
  document.getElementById('camera-action-buttons').style.display = 'none';
  document.getElementById('camera-confirm-buttons').style.display = 'flex';
  document.getElementById('camera-status-text').innerText = "Captured successfully";
  document.getElementById('camera-status-text').style.color = "var(--text-primary)";
  
  // Stop stream
  if (cameraStream) {
    cameraStream.getTracks().forEach(t => t.stop());
    cameraStream = null;
  }
}

function retakePhoto() {
  clearInterval(detectionInterval);
  isFaceDetected = false;
  openCameraModal(); // Re-opens and restarts flow
}

function useCapturedPhoto() {
  const preview = document.getElementById('camera-preview-img');
  state.userProfile.photo = preview.src;
  saveState();
  syncProfileData();
  closeCameraModal();
  showToast("Profile photo updated!");
}

function closeCameraModal() {
  clearInterval(detectionInterval);
  if (cameraStream) {
    cameraStream.getTracks().forEach(t => t.stop());
    cameraStream = null;
  }
  document.getElementById('camera-modal').classList.remove('open');
}

/* ==========================================================================
   LOGIN / LOGOUT LOGIC
   ========================================================================== */
function openLoginModal() {
  document.getElementById('login-modal').classList.add('open');
}

function handleLoginSubmit(e) {
  e.preventDefault();
  state.isAuthenticated = true;
  saveState();
  syncProfileData();
  closeAllModals();
  showToast("Logged in successfully!");
}

function handleLogoutClick() {
  if (confirm("Are you sure you want to logout?")) {
    state.isAuthenticated = false;
    saveState();
    syncProfileData();
    showToast("Logged out successfully.");
  }
}

/* ==========================================================================
   LOCATION TRACKER LOGIC
   ========================================================================== */
function openLocationTracker(workerName) {
  // Ask for permission before tracking
  if (navigator.geolocation) {
    const permit = confirm("Allow OnSpot to access worker location for live tracking?");
    if (permit) {
      document.getElementById('tracker-worker-name').innerText = workerName;
      document.getElementById('location-tracker-modal').classList.add('open');
    } else {
      showToast("Location access required for live tracking.");
    }
  } else {
    showToast("Geolocation not supported by this browser.");
  }
}

function closeLocationTracker() {
  document.getElementById('location-tracker-modal').classList.remove('open');
}

function stopLocationSharing() {
  closeLocationTracker();
  showToast("Location sharing stopped for this shift.");
}
