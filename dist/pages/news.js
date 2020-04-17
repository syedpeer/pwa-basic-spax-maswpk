customElements.define("news-list", class extends HTMLElement {
      // Constructor lifecycle hook
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
      }

      // Register observed attributes
      static get observedAttributes() { return ["loading", "stories", "paging", "apiUrl"]; }

      // Getters and setters for attributes
      get loading() {
        return JSON.parse(this.getAttribute("loading"));
      }
      set loading(loading) {
        this.setAttribute("loading", JSON.stringify(loading));
      }
      get stories() {
        return JSON.parse(this.getAttribute("stories"));
      }
      set stories(storiesNew) {
        this.setAttribute("stories", JSON.stringify(storiesNew));
      }
      get page() {
        return JSON.parse(this.getAttribute("page"));
      }
      set page(pageNew) {
        this.setAttribute("page", pageNew);
      }
      // apiUrl gets data attribute from custom element
      get apiUrl() {
        return this.getAttribute("data-api-url");
      }

      // Async function to fetch data from the api and return it
      async fetchStories(url) {
        this.loading = true;// Set loading var to true to display loading
        const response = await fetch(url);// Fetch call
        const json = await response.json();// Store response
        this.stories = json;// Update stories attribute with new data
        this.loading = false;// Hide loading
        this.page = this.page + 1;// Update pagination attribute
      }

      // connectedCallback lifecycle hook
      async connectedCallback() {
        this.shadowRoot.addEventListener("click", (event) => {// Add event listener for any click
          const elementId = event.srcElement.id;
          if ( elementId === "load-more" ) {// Fetch more if clicked element is load more button
            this.fetchStories( this.apiUrl + "&page=" + this.page);// Call fetchStories function
            this.page = this.page + 1;// Update pagination attribute
          }
        });
        await this.fetchStories( this.apiUrl );// Default fetch on component load
        this.page = this.page + 1;// Update pagination
      }

      // disconnectedCallback lifecycle hook
      disconnectedCallback() {
        // Not needed because event listener stays within web component scope
      }

      // Re-render any time an attribute is updated
      attributeChangedCallback(attrName, oldVal, newVal) {
        this.render();
      } 

      // Render lifecycle hook
      render() {
        if (this.loading) {
          //this.shadowRoot.innerHTML = `Loading...`;
          this.shadowRoot.innerHTML = `
          <style>
            img { 
              width: 25vw; 
              height: auto; 
              position:absolute;
              left:50px; 
              top:150px;               
            }

          </style>
          <div>
          <img src="../img/icons/loading.gif" />
          </div>
          `;
        } else {
          this.shadowRoot.innerHTML = `
          <style>
            .story { display: block; margin-bottom: 15px; }
            .story img { width: 100px; height: auto; border-radius: 25px;}
            img { width: 90vw; height: auto; border-radius: 15px; }
            a { text-decoration: none; }
            .divTitle { padding-top: .1rem; padding-bottom: .3rem; background-color: maroon; color: white; } 
          </style>
          <div>
            <p><div class="divTitle"><h3>&ensp;News Feed</h3></div></p>
            ${this.stories.articles.map((story) => {
              return `
                <img src="${story.urlToImage}" />
                <a class="story" href="${story.url}" target="blank">
                  <div class="story__title">
                    ${story.title}
                  </div>
                  <div class="story__source">
                    <br/>
                    Source: ${story.source.name}
                  </div>
                  <img src="" />
                </a>
              `;
            }).join("")}
            <!-- <button id="load-more">Load More</button> -->
          </div>
        `;
        }
      }
    });
