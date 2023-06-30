<p class="has-line-data" data-line-start="0" data-line-end="1"><a href="https://gist.github.com/cheerfulstoic/d107229326a01ff0f333a1d3476e068d"><img src="https://img.shields.io/badge/Maintenance%20Level-Actively%20Developed-brightgreen.svg" alt="Active Development"></a></p>
<h1 class="code-line" data-line-start=1 data-line-end=2 ><a id="TypeSub_1"></a>TypeSub</h1>
<h3 class="code-line" data-line-start=2 data-line-end=3 ><a id="A_strongly_typed_basic_pubsub_2"></a>A strongly typed basic pubsub</h3>
<p class="has-line-data" data-line-start="4" data-line-end="5">TypeSub is a very basic yet strongly typed pubusb system for typescript</p>
<h2 class="code-line" data-line-start=6 data-line-end=7 ><a id="Installation_6"></a>Installation</h2>
<p class="has-line-data" data-line-start="8" data-line-end="9">Install using npm, yarn or pnpm etc</p>
<pre><code class="has-line-data" data-line-start="10" data-line-end="12" class="language-bash">    pnpm install @typedts/typesub
</code></pre>
<h2 class="code-line" data-line-start=13 data-line-end=14 ><a id="Example_13"></a>Example</h2>
<p class="has-line-data" data-line-start="15" data-line-end="16">Create a pubsub instance using a <strong>type</strong></p>
<pre><code class="has-line-data" data-line-start="18" data-line-end="27" class="language-js">    type MyEvents = {
        LOADING_DONE: {
            id: string;
            place: string;
        }
    }

    const pubsub = createPubsub<MyEvents>();

</code></pre>

<p class="has-line-data" data-line-start="28" data-line-end="29">Now you can listen on your events safely</p>
<pre><code class="has-line-data" data-line-start="31" data-line-end="42" class="language-js">    pubusb.listen(<span class="hljs-string">"LOADING_DONE"</span>, (data) =&gt; {
        <span class="hljs-built_in">console</span>.log(data.id)
        <span class="hljs-built_in">console</span>.log(data.place)
    })
    
    // Registering multiple listeners</span>
    
    pubusb.listen("LOADING_DONE", (data) => {
        console.log("Second listener")
    })
</code></pre>
<p class="has-line-data" data-line-start="43" data-line-end="44">To publish events</p>
<pre><code class="has-line-data" data-line-start="45" data-line-end="50" class="language-js">    pubsub.publish(<span class="hljs-string">"LOADING_DONE"</span>, {
        id: <span class="hljs-string">"1"</span>,
        place: <span class="hljs-string">"base.ts"</span>
    })
</code></pre>
<h2 class="code-line" data-line-start=50 data-line-end=51 ><a id="Unsubscribing_50"></a>Unsubscribing</h2>
<p class="has-line-data" data-line-start="52" data-line-end="53">Unsubscribe to events that you no more want or dont want to listen to</p>
<pre><code class="has-line-data" data-line-start="54" data-line-end="57" class="language-js"><span class="hljs-keyword">const</span> unsub = pubsub.listen(<span class="hljs-string">"LOADING_DONE"</span>, (data) =&gt; ...);
unsub();
</code></pre>
<h2 class="code-line" data-line-start=58 data-line-end=59 ><a id="License_58"></a>License</h2>
<p class="has-line-data" data-line-start="60" data-line-end="61">MIT</p>
