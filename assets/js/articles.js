class ArticleManager {
    constructor() {
        this.currentPage = 1;
        this.articlesPerPage = 3;
        this.loadMoreBtn = document.getElementById('loadMoreBtn');
        this.setupListeners();
    }

    setupListeners() {
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => this.loadMoreArticles());
        }
    }

    loadMoreArticles() {
        const hiddenArticles = document.querySelectorAll('.article-card.hidden');
        const articlesToShow = Array.from(hiddenArticles).slice(0, this.articlesPerPage);
        
        articlesToShow.forEach(article => {
            article.classList.remove('hidden');
        });

        if (hiddenArticles.length <= this.articlesPerPage) {
            this.loadMoreBtn.style.display = 'none';
        }
    }
}