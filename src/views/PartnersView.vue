<script setup></script>

<template>
  <div class="view">
    <section>
      <h1>Partners</h1>
    </section>
    <!-- Tirem estas coisas a baixo quando já tiverem preenchido a página -->
    <!-- Meti-as para testas as transições entre páginas -->
    <section class="temp"></section>
    <section class="temp"></section>
    <section class="temp"></section>
    <section class="temp"></section>
    <section class="temp"></section>
    <section class="temp"></section>
  </div>
</template>

<style scoped>
/*
  USEM AS VARIÁVEIS, NOMEADAMENTE A --acc-color
  quase nunca deve ser preciso por o código da cor à mão
  todas as cores que vamos precisar estão definidas no global.css

  assim temos consistência no site inteiro e caso marketing
  se lembre de mudar a palete outra vez, é só alterar na variável
*/
.view {
  padding-top: var(--header-height);
  --acc-color: var(--c-acc-orange)
}

h1 {
  text-align: center;
  text-shadow: 0px 0px 15px var(--acc-color);
  margin: 2rem auto;
  position: relative;
  width: min-content;
}
</style>
