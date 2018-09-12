<template>
  <main>
    <nuxt-link
      class="back-button"
      to="/">
      &lt;-
    </nuxt-link>

    <h1>Mes slides</h1>

    <div class="slide-container">
      <article
        v-for="slide in slides"
        :key="slide.title">
        <nuxt-link
          v-if="!slide.external"
          :to="slide.url">
          <h2>{{ slide.title }}</h2>
          <p>{{ slide.description }}</p>
        </nuxt-link>
        <a
          v-else
          :href="slide.url"
          target="_blank"
          rel="noopener noreferrer">
          <h2>{{ slide.title }}</h2>
          <p>{{ slide.description }}</p>
        </a>
      </article>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        {
          title: 'JavaScript',
          description: 'La presentation qui présente l\'ensemble des nouveautées javascript et repose les bases du langage',
          url: '/slides/javascript.html',
          external: true
        },
        {
          title: 'Les modules en JavaScript',
          description: 'Laissez-moi vous raconter l\' histoire des modules en Javascript',
          url: '/slides/es-modules.html',
          external: true
        },
        {
          title: 'GraphQL, côté serveur ça donne quoi ?',
          description: 'GraphQL est au top du Hype car c\'est fun a utiliser côté client. Oui mais voilà... côté serveur quels sont les implication ?',
          url: '/slides/graphql-server-side.html',
          external: true
        },
        {
          title: 'Tribu Web Zenika - Soirée Progressive Web App',
          description: 'La Tribu Web de Zenika vous propose une soirée autour des progressive web app',
          url: '/slides/tribu-web-pwa.html',
          external: true
        },
        {
          title: 'Tribu Web Zenika - Soirée Web Worker',
          description: 'La Tribu Web de Zenika vous propose une soirée autour des web worker',
          url: '/slides/tribu-web-web-worker.html',
          external: true
        },
        {
          title: 'Tribu Web Zenika - TP React',
          description: 'Ma première présentation pour la Tribu Web de Zenika',
          url: '/slides/tribu-web-react.html',
          external: true
        }
      ]
    };
  }
};
</script>

<style scoped>
  .back-button {
    position: absolute;
    top: 5vh;
    left: 5vh;
    font-size: 1.3rem;
  }

  main {
    background: linear-gradient(90deg, #4B6CB7 0%, #550a55 100%);
    min-height: 100vh;
    width: 100vw;
  }

  h1 {
    height: 5vh;
    font-size: 1.5rem;
    text-align: center;
    padding: 5vh;
  }

  a {
    text-decoration: none;
    color: #eee;
  }

  .slide-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 0 10px;
  }

  @media (max-width: 600px){
    .slide-container {
      grid-template-columns: 1fr;
    }
  }

  article {
    box-shadow: 2px 2px #550a55;
    background-color: #BB4316;
    padding: 5vh 5vw;
    margin: 15px 10px;
    color: white;
    border-radius: 5px;
    transition: all 0.5s ease;
  }
  article:hover {
    transform: scale(1.05);
  }

  article h2 {
    text-align: center;
    font-size: 1.4rem;
    margin-bottom: 15px;
  }

  article p {
    font-style: italic;
    font-size: 0.9rem;
  }
</style>
