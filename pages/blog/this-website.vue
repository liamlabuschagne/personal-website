<template>
  <div>
    <h1>This Website</h1>
    <h2>Introduction</h2>
    <p>
      This blog post will explain in detail the technology used and how I
      managed to host everything 100% for free (except for the domain). Part of
      the reason I started this blog was to have a public record of my learning
      moments as well as something I could refer back to in 20 years to see what
      the heck I was doing at age 21 and to reflect on how far I had come as a
      developer. So without further ado, let the story begin!
    </p>
    <h2>How it all stared (the domain)</h2>
    <p>
      It all started late one night, or should I say morning (ahem) when I was
      checking the availability of random domains, I decided to check if my full
      name was available as a .com or similar and lo and behold, it was!
    </p>
    <p>
      I've always wanted a nice domain that was relatively short and contained
      my name but as you might image anything like liam.com or liam.net had been
      taken, even liam.nz! Thinking about it further I realised that a .nz
      domain might limit me in terms of my geographic representation (does that
      even make sense?). What I mean is that if I were to work overseas at any
      point and I gave people my .nz domain, it might seem a bit weird. I
      decided that a .com is the most generic, well known and nation agnostic
      TLD (unlike .org or .nz).
    </p>
    <p>
      Another consideration was that anything that was my first name plus some
      weird portion of my last name just wouldn't look good. At least with my
      full name, people would be able to derive it if they were contacts with me
      on messenger or email for example. Also, [fullname].com is just cool and
      sounds really professional.
    </p>
    <p>
      So with that I was decided and shopped around to find the best deal on
      that domain and found an aggregation website that identified
      <a href="https://spaceship.com">spaceship.com</a> as the cheapest option
      at just USD$0.99 for the first year (using a promo code) and something
      like $9USD renewal.
    </p>
    <p>
      After purchasing the domain I quickly added an A record to confirm
      everything was working (just pointing it to my existing home server IP
      address). Spaceship had a great DNS propagation check tool and the DNS
      record propagated within seconds (admittedly I use Cloudflare's 1.1.1.1
      CDN which may have speed up the process for me)
    </p>
    <h2>Where to host it?</h2>
    <p>
      With a shiny new domain to play with, I now had the question: where should
      I actually host my new personal website? Initially I thought I would host
      it on my home server as I had done in the past. My current home server
      consists of a
      <a href="http://nanopi.io/nanopi-neo.html">nanopi neo</a> running an nginx
      web server, proxying php requests to php-fpm. For database, I had set up a
      mysql server and for email I was running a postfix/dovecot server with
      postfixadmin on a Raspberry Pi 3.
    </p>
    <p>
      This setup has caused problems for me in the past however, for example my
      Raspberry Pi has already killed two SD cards and my websites have been
      down several times due to a configuration error or network error or simply
      a cable being pulled out by accident. So I decided a better solution would
      be to opt for some sort of cloud solution, something that would still be
      free but would be hassle free and always available. Then it hit me, I can
      use Gitlab Pages from Gitlab (my online git server provider of choice)!
      This would allow me to to add a deploy workflow which would automatically
      deploy my website every time I pushed something to my repository.
    </p>
    <p>
      I then started researching Gitlab Pages, how to set it up and particularly
      I was interested in the performance since I didn't want to loose the fast
      loading and low latency I was achieving with my server. Pinging Gitlab's
      ip addresses, I was getting roughly 30ms of ping whereas with github pages
      I was getting around 5ms. Upon further investigation I discovered that
      GitHub uses Fastly as their CDN service which happens to have servers in
      NZ but Gitlab only has servers in the US (on Google Cloud Platform) making
      it significantly slower from outside the US.
    </p>
    <h3>Compared to my self-hosted websites</h3>
    <p>
      To compare it to my home server I decided to test the response time for
      accessing the favicon.ico on one of my existing self-hosted websites. My
      self-hosted website took on average 10ms to respond to a GET request for a
      favicon compared to only 5ms on average on Github pages, a 2x difference!
      With these metrics providing really good results I was happy to settle on
      GitHub pages for hosting.
    </p>
    <h2>Technology Stack</h2>
    <p>
      Since I've selected GitHub pages as my hosting, I am somewhat limited in
      terms of technology stack, the only real option being a fully static
      deployment option. Having worked with it a little bit and more than any
      other front-end framework I decided I would use Vue.js and the Vue router
      to create a single page application (SPA). This allows me a lot of the
      flexibility of a php or Node.js server deployment without an actual server
      (using Javascript to make dynamic pages and record state where necessary).
      I also opted to enable Typescript for more strict typing and confidence
      that there won't be unexpected runtime errors (or at least less).
    </p>
    <p>
      Vue's recommended build system is Vite which is awesomely easy to use
      since with a single command: npm run dev you can start a development
      server on your local machine and have everything hot-reload as you make
      changes to the code, significantly improving development iterations. It
      also does all the minification and Typescipt compilation, dumping
      everything into a folder called dist which you can then upload as a
      completed package to any web server.
    </p>
    <h2>CI/CD</h2>
    <p>
      Using Vite and the Vue router was causing an issue with Github pages since
      all requests other than to the index page were being automatically sent to
      a file called 404.html which is provided by Github pages. This page is the
      same as the root index.html page used to serve the website but with a 404
      response code. The problem is that search engines will therefore consider
      every page other than the root to be returning a 404 not found and
      therefore not include the page in the index.
    </p>
    <p>
      The solution I decided on was to recreate my website using
      <a href="https://nuxt.com/" target="_blank">Nuxt.js</a> which is a
      framework built on top of Vue.js that allows for generating a fully static
      version of the website using a simple npm command. Putting this in a
      github workflow directly copied
      <a href="https://nuxt.com/deploy/github-pages" target="_blank"
        >from the guide</a
      >
      I was able to get a fully automated CI/CD pipeline that would generate the
      static website and deploy it to github pages static hosting.
    </p>
    <p>
      Nuxt also provides a useful pre-defined directory structure including the
      <i>pages/</i> directory which allows you to create a new page by simply
      creating a new .vue file in that directory. This is a huge improvement
      over Vue router which requires you to manually add a new route to the
      router file each time.
    </p>
  </div>
</template>
