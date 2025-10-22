const API_BASE_URL = 'http://localhost:8080/notes';
let currentNoteId = null;
let currentPage = 0;
const pageSize = 9;
let notes = [];

function showHomeSection() {
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = `
        <section class="home-section active" id="home-section">
            <section class="hero">
                <div class="hero-content">
                    <div class="hero-text">
                        <h2>ایده‌هایت را روی کاغذ بنویس</h2>
                        <p>برنامه ساده و زیبا برای ثبت یادداشت‌های روزانه با ظاهری شبیه کاغذ واقعی. هر یادداشت مانند یک تکه کاغذ زیبا نمایش داده می‌شود.</p>
                        <div class="hero-actions">
                            <button class="btn btn-primary btn-large pulse" onclick="showCreateNoteEditor()">
                                <i class="fas fa-plus"></i>
                                شروع کنید
                            </button>
                            <button class="btn btn-secondary btn-large" onclick="showNotesSection()">
                                <i class="fas fa-list"></i>
                                مشاهده یادداشت‌ها
                            </button>
                        </div>
                    </div>
                    <div class="hero-visual">
                        <div class="floating-notes">
                            <div class="paper-note paper-1">
                                <div class="note-content">
                                    <h3>لیست خرید</h3>
                                    <ul>
                                        <li>شیر</li>
                                        <li>نان</li>
                                        <li>تخم مرغ</li>
                                        <li>میوه</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="paper-note paper-2">
                                <div class="note-content">
                                    <h3>ایده‌های پروژه</h3>
                                    <p>یک برنامه یادداشت‌برداری ساده با طراحی کاغذی ایجاد کن...</p>
                                </div>
                            </div>
                            <div class="paper-note paper-3">
                                <div class="note-content">
                                    <h3>یادآوری مهم</h3>
                                    <p>جلسه فردا ساعت ۱۰ صبح - سالن کنفرانس</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ویژگی‌ها -->
            <section class="features">
                <div class="section-header">
                    <h2>چرا برنامه ما؟</h2>
                    <p>ویژگی‌های منحصر به فرد برنامه یادداشت‌های کاغذی</p>
                </div>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-pencil-alt"></i>
                        </div>
                        <h3>نوشتن آسان</h3>
                        <p>با رابط کاربری ساده و intuitive، یادداشت‌هایت را سریع بنویس و مدیریت کن</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-palette"></i>
                        </div>
                        <h3>طرح کاغذی واقعی</h3>
                        <p>ظاهر واقع‌گرایانه کاغذ با خطوط راهنما برای تجربه‌ای طبیعی و دلپذیر</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i class="fas fa-moon"></i>
                        </div>
                        <h3>تم روز و شب</h3>
                        <p>با توجه به شرایط نوری محیط، تم مناسب را انتخاب کن و از خوانایی لذت ببر</p>
                    </div>
                </div>
            </section>

            <!-- نمونه یادداشت‌ها -->
            <section class="sample-notes">
                <div class="section-header">
                    <h2>یادداشت‌های نمونه</h2>
                    <p>نمایشی از ظاهر زیبای یادداشت‌های کاغذی در عمل</p>
                </div>
                <div class="notes-grid">
                    <div class="paper-note sample-note">
                        <div class="note-header">
                            <h3>یادداشت شخصی</h3>
                            <span class="note-date">امروز</span>
                        </div>
                        <div class="note-content">
                            <p>این یک نمونه از ظاهر یادداشت‌ها در برنامه است. طراحی شبیه کاغذ واقعی با سایه‌های طبیعی و بافت مناسب برای تجربه‌ای لذت‌بخش.</p>
                        </div>
                        <div class="note-actions">
                            <button class="btn-icon">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="paper-note sample-note">
                        <div class="note-header">
                            <h3>لیست کارها</h3>
                            <span class="note-date">دیروز</span>
                        </div>
                        <div class="note-content">
                            <ul>
                                <li>تکمیل پروژه React</li>
                                <li>خرید هدیه تولد</li>
                                <li>تماس با مشتری جدید</li>
                                <li>بررسی ایمیل‌ها</li>
                            </ul>
                        </div>
                        <div class="note-actions">
                            <button class="btn-icon">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="paper-note sample-note">
                        <div class="note-header">
                            <h3>ایده‌های خلاقانه</h3>
                            <span class="note-date">۲ روز پیش</span>
                        </div>
                        <div class="note-content">
                            <p>گاهی بهترین ایده‌ها در ساده‌ترین لحظات به ذهن می‌رسند. آنها را فراموش نکن و همیشه همراه خودت داشته باش!</p>
                        </div>
                        <div class="note-actions">
                            <button class="btn-icon">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    `;
}

function showNotesSection() {
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = `
        <section class="notes-section active" id="notes-section">
            <div class="notes-controls">
                <h2>همه یادداشت‌ها</h2>
                <div class="search-box">
                    <input type="text" id="search-notes" placeholder="جستجو در یادداشت‌ها...">
                    <i class="fas fa-search"></i>
                </div>
                <button class="btn btn-back" onclick="showHomeSection()">
                    <i class="fas fa-arrow-right"></i>
                    بازگشت به صفحه اصلی
                </button>
            </div>
            
            <div class="notes-grid" id="notes-container">
            </div>
            
            <div class="empty-state" id="empty-state">
                <i class="fas fa-sticky-note"></i>
                <h3>هنوز یادداشتی ندارید</h3>
                <p>اولین یادداشت خود را ایجاد کنید تا اینجا نمایش داده شود.</p>
                <button class="btn btn-primary" onclick="showCreateNoteEditor()">
                    <i class="fas fa-plus"></i>
                    ایجاد یادداشت جدید
                </button>
            </div>
        </section>
    `;

    loadNotes();

    const searchInput = document.getElementById('search-notes');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
    }
}

function showCreateNoteEditor() {
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = `
        <section class="editor-section active" id="editor-section">
            <div class="editor-header">
                <h2 id="editor-title">یادداشت جدید</h2>
                <div class="editor-actions">
                    <button class="btn btn-back" onclick="showNotesSection()">
                        <i class="fas fa-arrow-right"></i>
                        بازگشت
                    </button>
                    <button class="btn btn-secondary" onclick="cancelEditing()">
                        <i class="fas fa-times"></i>
                        لغو
                    </button>
                    <button class="btn btn-primary" onclick="saveNote()" id="save-btn">
                        <i class="fas fa-save"></i>
                        ذخیره یادداشت
                    </button>
                </div>
            </div>
            
            <div class="paper-editor">
                <input type="text" class="editor-title" id="note-title" placeholder="عنوان یادداشت...">
                <textarea class="editor-content" id="note-content" placeholder="متن یادداشت خود را اینجا بنویسید..."></textarea>
            </div>
        </section>
    `;

    currentNoteId = null;
    document.getElementById('editor-title').textContent = 'یادداشت جدید';
    document.getElementById('note-title').value = '';
    document.getElementById('note-content').value = '';

    setTimeout(() => {
        document.getElementById('note-title').focus();
    }, 100);
}

function showEditNoteEditor(noteId) {
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = `
        <section class="editor-section active" id="editor-section">
            <div class="editor-header">
                <h2 id="editor-title">ویرایش یادداشت</h2>
                <div class="editor-actions">
                    <button class="btn btn-back" onclick="showNotesSection()">
                        <i class="fas fa-arrow-right"></i>
                        بازگشت
                    </button>
                    <button class="btn btn-secondary" onclick="cancelEditing()">
                        <i class="fas fa-times"></i>
                        لغو
                    </button>
                    <button class="btn btn-primary" onclick="saveNote()" id="save-btn">
                        <i class="fas fa-save"></i>
                        ذخیره تغییرات
                    </button>
                </div>
            </div>
            
            <div class="paper-editor">
                <input type="text" class="editor-title" id="note-title" placeholder="عنوان یادداشت...">
                <textarea class="editor-content" id="note-content" placeholder="متن یادداشت خود را اینجا بنویسید..."></textarea>
            </div>
        </section>
    `;

    loadNoteForEdit(noteId);
}

async function loadNoteForEdit(noteId) {
    try {
        showNotification('در حال بارگذاری یادداشت...', 'info');

        const response = await fetch(`${API_BASE_URL}/getTaskById/${noteId}`);
        if (response.ok) {
            const note = await response.json();
            currentNoteId = noteId;
            document.getElementById('editor-title').textContent = 'ویرایش یادداشت';
            document.getElementById('note-title').value = note.title || '';
            document.getElementById('note-content').value = note.content || '';

            showNotification('یادداشت با موفقیت بارگذاری شد', 'success');
        } else {
            const error = await response.text();
            throw new Error(error || 'خطا در بارگذاری یادداشت');
        }
    } catch (error) {
        showNotification(error.message, 'error');
        setTimeout(() => {
            showNotesSection();
        }, 2000);
    }
}

function cancelEditing() {
    showModal(
        'لغو تغییرات',
        'آیا از لغو تغییرات اطمینان دارید؟ تغییرات ذخیره نشده از بین خواهند رفت.',
        () => {
            showNotesSection();
        }
    );
}

function toggleTheme() {
    const app = document.querySelector('.app');
    const themeIcon = document.querySelector('.theme-toggle i');

    if (app.classList.contains('light')) {
        app.classList.remove('light');
        app.classList.add('dark');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        app.classList.remove('dark');
        app.classList.add('light');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.querySelector('.theme-toggle i');

    if (savedTheme === 'dark') {
        document.querySelector('.app').classList.replace('light', 'dark');
        themeIcon.className = 'fas fa-sun';
    }

    showHomeSection();
});


async function loadNotes(page = 0) {
    const notesContainer = document.getElementById('notes-container');
    const emptyState = document.getElementById('empty-state');

    if (!notesContainer) return;

    try {
        currentPage = page;

        notesContainer.innerHTML = `
            <div class="empty-state" style="display: block;">
                <div class="loading" style="width: 40px; height: 40px; border-width: 4px; margin: 0 auto 1rem;"></div>
                <p>در حال بارگذاری یادداشت‌ها...</p>
            </div>
        `;

        const response = await fetch(`${API_BASE_URL}/findAll?page=${page}&size=${pageSize}&sort=id,desc`);

        if (response.ok) {
            const data = await response.json();
            notes = data.content || [];
            const totalPages = data.totalPages || 0;
            const totalElements = data.totalElements || 0;

            notesContainer.innerHTML = '';

            if (notes.length === 0) {
                emptyState.style.display = 'block';
                const existingPagination = document.getElementById('pagination');
                if (existingPagination) {
                    existingPagination.remove();
                }
                return;
            }

            emptyState.style.display = 'none';

            notes.forEach(note => {
                const noteElement = createNoteElement(note);
                notesContainer.appendChild(noteElement);
            });

            addPagination(totalPages, totalElements, page);

        } else {
            throw new Error('خطا در بارگذاری یادداشت‌ها');
        }
    } catch (error) {
        notesContainer.innerHTML = '';
        emptyState.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <h3>خطا در بارگذاری</h3>
            <p>${error.message}</p>
            <button class="btn btn-primary" onclick="loadNotes(0)" style="margin-top: 1rem;">
                <i class="fas fa-redo"></i>
                تلاش مجدد
            </button>
        `;
        emptyState.style.display = 'block';
    }
}

function createNoteElement(note) {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'paper-note';
    noteDiv.setAttribute('data-note-id', note.id);

    const truncatedContent = truncateContent(note.content, 150);
    const isTruncated = note.content && note.content.length > 150;

    noteDiv.innerHTML = `
        <div class="note-header">
            <h3 title="${note.title}">${truncateText(note.title, 40)}</h3>
            <span class="note-date">${formatDate(note.createdDate || new Date().toISOString())}</span>
        </div>
        <div class="note-content ${isTruncated ? 'truncated' : ''}">
            ${formatNoteContent(truncatedContent)}
        </div>
        ${isTruncated ? `<button class="read-more" onclick="expandNote(this)">مشاهده بیشتر</button>` : ''}
        <div class="note-actions">
            <button class="btn-icon" onclick="showEditNoteEditor(${note.id})" title="ویرایش">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn-icon" onclick="showDeleteModal(${note.id})" title="حذف">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    if (isTruncated) {
        noteDiv.setAttribute('data-full-content', note.content);
    }

    return noteDiv;
}

function truncateText(text, maxLength) {
    if (!text) return 'بدون عنوان';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function truncateContent(content, maxLength) {
    if (!content) return 'بدون محتوا';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
}

function expandNote(button) {
    const noteDiv = button.closest('.paper-note');
    const contentDiv = noteDiv.querySelector('.note-content');
    const fullContent = noteDiv.getAttribute('data-full-content');

    if (fullContent) {
        contentDiv.innerHTML = formatNoteContent(fullContent);
        contentDiv.classList.remove('truncated');
        button.style.display = 'none';

        contentDiv.style.maxHeight = '300px';
        contentDiv.style.overflowY = 'auto';
    }
}

function formatNoteContent(content) {
    if (!content) return '<p>بدون محتوا</p>';

    let formattedContent = content.replace(/\n/g, '<br>');

    if (content.includes('- ') || content.includes('• ') || content.includes('* ')) {
        const lines = content.split('\n');
        let html = '';
        let inList = false;

        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('• ') || trimmedLine.startsWith('* ')) {
                if (!inList) {
                    html += '<ul>';
                    inList = true;
                }
                html += `<li>${trimmedLine.substring(2)}</li>`;
            } else {
                if (inList) {
                    html += '</ul>';
                    inList = false;
                }
                if (trimmedLine) {
                    html += `<p>${line}</p>`;
                }
            }
        });

        if (inList) {
            html += '</ul>';
        }

        return html || `<p>${content}</p>`;
    }

    return `<p>${formattedContent}</p>`;
}

function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            return 'امروز';
        } else if (diffDays === 2) {
            return 'دیروز';
        } else if (diffDays <= 7) {
            return `${diffDays - 1} روز پیش`;
        } else {
            return date.toLocaleDateString('fa-IR');
        }
    } catch (error) {
        return 'تاریخ نامعلوم';
    }
}

function addPagination(totalPages, totalElements, currentPage) {
    const existingPagination = document.getElementById('pagination');
    if (existingPagination) {
        existingPagination.remove();
    }

    if (totalPages <= 1) return;

    const notesSection = document.getElementById('notes-section');
    const pagination = document.createElement('div');
    pagination.id = 'pagination';
    pagination.className = 'pagination';

    const startItem = (currentPage * pageSize) + 1;
    const endItem = Math.min((currentPage + 1) * pageSize, totalElements);

    pagination.innerHTML = `
        <div class="pagination-info">
            نمایش ${startItem}-${endItem} از ${totalElements} یادداشت
        </div>
        <div class="pagination-controls">
            <button class="pagination-btn" onclick="loadNotes(0)" ${currentPage === 0 ? 'disabled' : ''} title="صفحه اول">
                <i class="fas fa-angle-double-right"></i>
            </button>
            <button class="pagination-btn" onclick="loadNotes(${currentPage - 1})" ${currentPage === 0 ? 'disabled' : ''} title="صفحه قبلی">
                <i class="fas fa-angle-right"></i>
            </button>
            
            <span class="pagination-page">صفحه ${currentPage + 1} از ${totalPages}</span>
            
            <button class="pagination-btn" onclick="loadNotes(${currentPage + 1})" ${currentPage >= totalPages - 1 ? 'disabled' : ''} title="صفحه بعدی">
                <i class="fas fa-angle-left"></i>
            </button>
            <button class="pagination-btn" onclick="loadNotes(${totalPages - 1})" ${currentPage >= totalPages - 1 ? 'disabled' : ''} title="صفحه آخر">
                <i class="fas fa-angle-double-left"></i>
            </button>
        </div>
    `;

    notesSection.appendChild(pagination);
}

function handleSearchInput(event) {
    const searchTerm = event.target.value.trim();

    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
        if (searchTerm) {
            searchNotes(0, searchTerm);
        } else {
            loadNotes(0);
        }
    }, 500);
}

async function searchNotes(page = 0, searchTerm = null) {
    const term = searchTerm || document.getElementById('search-notes').value.trim();
    const notesContainer = document.getElementById('notes-container');
    const emptyState = document.getElementById('empty-state');

    if (!notesContainer) return;

    if (!term) {
        loadNotes(page);
        return;
    }

    try {
        currentPage = page;

        notesContainer.innerHTML = `
            <div class="empty-state" style="display: block;">
                <div class="loading" style="width: 40px; height: 40px; border-width: 4px; margin: 0 auto 1rem;"></div>
                <p>در حال جستجو...</p>
            </div>
        `;

        const response = await fetch(`${API_BASE_URL}/findAllByTitle/${encodeURIComponent(term)}?page=${page}&size=${pageSize}&sort=id,desc`);

        if (response.ok) {
            const data = await response.json();
            const filteredNotes = data.content || [];
            const totalPages = data.totalPages || 0;
            const totalElements = data.totalElements || 0;

            notesContainer.innerHTML = '';

            if (filteredNotes.length === 0) {
                emptyState.style.display = 'block';
                emptyState.innerHTML = `
                    <i class="fas fa-search"></i>
                    <h3>یادداشتی یافت نشد</h3>
                    <p>هیچ یادداشتی با عبارت "${term}" پیدا نشد.</p>
                    <button class="btn btn-primary" onclick="clearSearch()" style="margin-top: 1rem;">
                        <i class="fas fa-times"></i>
                        پاک کردن جستجو
                    </button>
                `;

                const existingPagination = document.getElementById('pagination');
                if (existingPagination) {
                    existingPagination.remove();
                }
                return;
            }

            emptyState.style.display = 'none';

            filteredNotes.forEach(note => {
                const noteElement = createNoteElement(note);
                notesContainer.appendChild(noteElement);
            });

            addPagination(totalPages, totalElements, page);

        } else {
            throw new Error('خطا در جستجو');
        }
    } catch (error) {
        notesContainer.innerHTML = '';
        emptyState.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <h3>خطا در جستجو</h3>
            <p>${error.message}</p>
            <button class="btn btn-primary" onclick="clearSearch()" style="margin-top: 1rem;">
                <i class="fas fa-times"></i>
                پاک کردن جستجو
            </button>
        `;
        emptyState.style.display = 'block';
    }
}

function clearSearch() {
    const searchInput = document.getElementById('search-notes');
    if (searchInput) {
        searchInput.value = '';
    }
    loadNotes(0);
}

async function saveNote() {
    const title = document.getElementById('note-title').value.trim();
    const content = document.getElementById('note-content').value.trim();
    const saveBtn = document.getElementById('save-btn');

    if (!title) {
        showNotification('لطفاً عنوان یادداشت را وارد کنید.', 'warning');
        document.getElementById('note-title').focus();
        return;
    }

    if (!content) {
        showNotification('لطفاً محتوای یادداشت را وارد کنید.', 'warning');
        document.getElementById('note-content').focus();
        return;
    }

    const noteData = {
        title: title,
        content: content
    };

    try {
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<div class="loading"></div> در حال ذخیره...';

        let response;
        let method;
        let url;

        if (currentNoteId) {
            method = 'PUT';
            url = `${API_BASE_URL}/update/${currentNoteId}`;
        } else {
            method = 'POST';
            url = `${API_BASE_URL}/addNotes`;
        }

        response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteData)
        });

        if (response.ok) {
            const result = await response.text();
            showNotification('یادداشت با موفقیت ذخیره شد', 'success');
            setTimeout(() => {
                showNotesSection();
            }, 1500);
        } else {
            const error = await response.text();
            throw new Error(error || 'خطا در ذخیره یادداشت');
        }

    } catch (error) {
        showNotification(error.message, 'error');
    } finally {
        if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = currentNoteId ?
                '<i class="fas fa-save"></i> ذخیره تغییرات' :
                '<i class="fas fa-save"></i> ذخیره یادداشت';
        }
    }
}

function showDeleteModal(noteId) {
    const note = notes.find(n => n.id === noteId);
    const noteTitle = note ? note.title : 'این یادداشت';

    showModal(
        'حذف یادداشت',
        `آیا از حذف یادداشت "${truncateText(noteTitle, 30)}" اطمینان دارید؟ این عمل قابل بازگشت نیست.`,
        () => {
            deleteNote(noteId);
        },
        'حذف',
        'btn-primary',
        'لغو'
    );
}

async function deleteNote(id) {
    try {
        showNotification('در حال حذف یادداشت...', 'info');

        const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
            method: 'GET'
        });

        if (response.ok) {
            const result = await response.text();
            showNotification('یادداشت با موفقیت حذف شد', 'success');
            setTimeout(() => {
                loadNotes(currentPage);
            }, 1000);
        } else {
            const error = await response.text();
            throw new Error(error || 'خطا در حذف یادداشت');
        }
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

function showModal(title, message, confirmCallback, confirmText = 'تایید', confirmClass = 'btn-primary', cancelText = 'لغو') {
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${title}</h3>
            <p>${message}</p>
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="closeModal(this)">${cancelText}</button>
                <button class="btn ${confirmClass}" onclick="handleConfirm(this)">${confirmText}</button>
            </div>
        </div>
    `;

    modal.dataset.confirmCallback = confirmCallback.toString();

    document.body.appendChild(modal);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal(modal);
        }
    });

    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

function closeModal(element) {
    const modal = element.closest('.modal');
    if (modal) {
        // حذف event listener کلید ESC
        document.removeEventListener('keydown', handleEscape);
        modal.remove();
    }
}

function handleConfirm(element) {
    const modal = element.closest('.modal');
    if (modal) {
        const confirmCallback = new Function('return ' + modal.dataset.confirmCallback)();
        confirmCallback();
        closeModal(modal);
    }
}

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success':
            return 'fa-check-circle';
        case 'error':
            return 'fa-exclamation-circle';
        case 'warning':
            return 'fa-exclamation-triangle';
        case 'info':
        default:
            return 'fa-info-circle';
    }
}

window.addEventListener('error', function(e) {
    console.error('خطای JavaScript:', e.error);
    showNotification('خطایی در برنامه رخ داده است', 'error');
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Promise رد شده:', e.reason);
    showNotification('خطایی در ارتباط با سرور رخ داده است', 'error');
    e.preventDefault();
});

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        showCreateNoteEditor();
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        showHomeSection();
    }

    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal');
        if (modal) {
            closeModal(modal);
        }
    }
});

console.log(`
🎯 کلیدهای میانبر برنامه:
• Ctrl + N - ایجاد یادداشت جدید
• Ctrl + H - بازگشت به صفحه اصلی
• Escape - بستن مودال
`);