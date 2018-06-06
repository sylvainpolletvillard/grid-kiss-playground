function format([str]){
	return str.trim();
}

const presets = [

	{
		name: "Basic website layout",
		hash: "basic-layout",
		html: format`
<header>
	Header
</header>

<aside class="sidebar">
	Sidebar
</aside>

<main>
	Main content
</main>

<footer>
	Footer
</footer>
		`,
		css: format`
body {
	grid-kiss:
		"+------------------------------+      "
		"|           header ↑           | 120px"
		"+------------------------------+      "
		"                                      "
		"+--150px---+  +----- auto -----+      "
		"| .sidebar |  |      main      | auto "
		"+----------+  +----------------+      "
		"                                      "
		"+------------------------------+      "
		"|              ↓               |      "
		"|         → footer ←           | 60px "
		"+------------------------------+      "
}

header   { background: cyan; }
.sidebar { background: lime; }
main     { background: yellow; }
footer   { background: pink; }
`
	},

	{
		name: "Zones on multiple rows/cols - alt style 1",
		hash: "multiple-span-zones",
		css: format`
#grid {
    grid-kiss:        
    "┌──────┐ ┌─────────────┐       "
    "│      │ │             │ 100px "
    "│   ^  │ │   < .bar >  │       "
    "│ .baz │ └─────────────┘   -   "
    "│   v  │ ┌────┐ ┌──────┐       "
    "│      │ |    | │  ^   │ 100px "
    "└──────┘ └────┘ │      │       "
    "┌─────────────┐ │ .foo │   -   "
    "│   < .qux >  │ │  v   │       "
    "│             │ │      │ 100px "
    "└─────────────┘ └──────┘       "
    "  100px | 100px | 100px        "
    ;  
}

#grid > div {
    border:2px solid black;
    background-color: #ccc;
    padding: 0.5em;
}

#container {    
    width: 400px;
    height: 400px;
    padding: 1em;
}    
`,

		html: format`
<div id="container">
	<div id="grid">
		<div class="foo">Foo</div>
		<div class="bar">Bar</div>
		<div class="baz">Baz</div>
		<div class="qux">Qux</div>
	</div>	
</div>
`

	},

	{
		name: "Fractions of free space - alt style 2",
		hash: "fr-fractions",
		css: format`
body {
	grid-kiss:
	"╔═10═╗                  ╔═10═╗    "
	"║ .a ║                  ║ .b ║ 3fr"
	"╚════╝                  ╚════╝    "
	"      ╔═20═╗      ╔═20═╗          "
	"      ║ .c ║      ║ .d ║       5fr"
	"      ╚════╝      ╚════╝          "
	"            ╔═30═╗                "
	"            ║ .e ║             7fr"
	"            ╚════╝                "
}

div {   
   background: #eee;
   border: 1px solid #999;
   padding: 1em;
}`,

		html: `
<div class="a">a</div>
<div class="b">b</div>
<div class="c">c</div>
<div class="d">d</div>
<div class="e">e</div>
`

	},

	{
		name: "Vertical and horizontal centering",
		hash: "vertical-horizontal-centering",
		css: format`
body {
  grid-kiss:
    "+-------+"
    "|   ↓   |"
    "|→ div ←|"
    "|   ↑   |"
    "+-------+"
}

div { 
  border: 1px solid black;
  padding: 1rem;
  overflow: scroll;
  resize: both;
}
`,

		html: `<div> Resize me </div>`
	},

	{
		name: "Responsive layout with media queries",
		hash: "responsive-layout",
		css: format`
body {
  grid-kiss:
    "+----------+      "
    "|  header  | 80px "
    "+----------+      "
    "                  "
    "+----------+      "
    "|  .bloc1  |      "
    "+----------+      "
    "                  "
    "+----------+      "
    "|  .bloc2  |      "
    "+----------+      "
    "                  "
    "+----------+      "
    "|  .bloc3  |      "
    "+----------+      "
    "                  "
    "+----------+      "
    "|  .bloc4  |      "
    "+----------+      "    
}     

@media (min-width:640px){
  body {
    grid-kiss:
    "+----------------------------+      "
    "|        header              | 120px"
    "+----------------------------+      "
    "                                    "
    "+------------+  +------------+      "
    "|   .bloc1   |  |   .bloc2   |      "
    "+------------+  +------------+      "
    "                                    "
    "+------------+  +------------+      "
    "|   .bloc3   |  |   .bloc4   |      "
    "+------------+  +------------+      "
  }
}

@media (min-width: 960px){
  body {
    grid-kiss:
    "+--------------------------------+       "
    "|             header             | 120px "
    "+--------------------------------+       "
    "                                         "
    "+--------------------------------+       "
    "|             .bloc1             | <6rem "
    "+--------------------------------+       "
    "                                         "
    "+--------+  +--------+  +--------+       "
    "| .bloc2 |  | .bloc3 |  | .bloc4 |       "
    "+--------+  +--------+  +--------+       "
  }
}

header { background: yellow }
.bloc1 { background: blue }
.bloc2 { background: green }
.bloc3 { background: purple }
.bloc4 { background: chocolate }

.bloc {
	text-align:center;
	color: white;
	font-size: 48px;
}
`,

		html: format`
<header> Responsive design layout with media queries
  <br> Try to resize your browser !
</header>	
<div class="bloc bloc1">1</div>
<div class="bloc bloc2">2</div>
<div class="bloc bloc3">3</div>
<div class="bloc bloc4">4</div>
`
	},

	{
		name: "Calculator with :nth-of-type helpers",
		hash: "nth-of-type-helpers",
		css: format`
#calc {
	grid-kiss:
	"+-----------------------------------------------------+"
	"|                       output                        |"
	"+-----------------------------------------------------+"
	"+----------+  +----------+  +----------+  +-----------+"
	"|   .ac    |  |  .sign   |  | .percent |  |  .divide  |"
	"+----------+  +----------+  +----------+  +-----------+"
	"+----------+  +----------+  +----------+  +-----------+"
	"|    :7    |  |    :8    |  |    :9    |  | .multiply |"
	"+----------+  +----------+  +----------+  +-----------+"
	"+----------+  +----------+  +----------+  +-----------+"
	"|    :4    |  |    :5    |  |    :6    |  |  .minus   |"
	"+----------+  +----------+  +----------+  +-----------+"
	"+----------+  +----------+  +----------+  +-----------+"
	"|    :1    |  |    :2    |  |    :3    |  |  .plus    |"
	"+----------+  +----------+  +----------+  +-----------+"
	"+------------------------+  +----------+  +-----------+"
	"|         .zero          |  |  .point  |  |  .equals  |"
	"+------------------------+  +----------+  +-----------+"
}

output { 
    background-color: #333;
	color: white;
	margin: 0;
	padding: 1rem;
	font-size: 2rem;
	text-align: right;
}

button {
	font-size: 2rem;
	border: 1px solid #333;
	background-color: #efefef;
}

.ac, .sign, .percent {
	background-color: #ccc;
}

button.operation {
	background-color: orange;
}
`,
		html: format`
<div id="calc">
    <button>1</button>
    <button>2</button>
    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>6</button>
    <button>7</button>
    <button>8</button>
    <button>9</button>
    <button class="zero">0</button>
    <button class="point">.</button>
    <button class="ac">AC</button>
    <button class="sign">+/-</button>
    <button class="percent">%</button>
    <button class="divide operation">/</button>
    <button class="multiply operation">X</button>
    <button class="minus operation">-</button>
    <button class="plus operation">+</button>
    <button class="equals operation">=</button>
    <output>0</output>
</div>
`
	},

	{
		name: "Layout with gaps",
		hash: "gaps",
		css: format`
body {
	grid-kiss:
	"                                               "
	"    +-----+      +-----+      +-----+  ----    "
	"    | .nw |      | .n  |      | .ne | 100px    "
	"    +-----+      +-----+      +-----+  ----    "
	"                                       50px    "
	"    +-----+      +-----+      +-----+  ----    "
	"    | .w  |      |     |      | .e  | 100px    "
	"    +-----+      +-----+      +-----+  ----    "
	"                                       50px    "
	"    +-----+      +-----+      +-----+  ----    "
	"    | .sw |      | .s  |      | .se | 100px    "
	"    +-----+      +-----+      +-----+  ----    "
	"    |100px| 50px |100px| 50px |100px|          "
	"                                               "
}

div {
	background: #ccc;
	border: 1px dashed black;
	text-align: center;
	line-height: 100px;
}
`,

		html: format`
<div class="n">N</div>
<div class="e">E</div>
<div class="s">S</div>
<div class="w">W</div>
<div class="ne">NE</div>
<div class="se">SE</div>
<div class="nw">NW</div>
<div class="sw">SW</div>
`
	},

	{
		name: "All the alignment options",
		hash: "all-alignment-options",

		css: format`
.justify-start {
	grid-kiss:
	"+---+ +---+ +---+    "
	"| a | | b | | c |    "
	"+---+ +---+ +---+    "
	"+---+ +---+ +---+    "
	"| d | | e | | f |    "
	"+---+ +---+ +---+    "
	"+---+ +---+ +---+    "
	"| g | | h | | i |    "
	"+---+ +---+ +---+    "
	" 50px  50px  50px    "
}

.justify-end {
	grid-kiss:
	"    +---+ +---+ +---+"
	"    | a | | b | | c |"
	"    +---+ +---+ +---+"
	"    +---+ +---+ +---+"
	"    | d | | e | | f |"
	"    +---+ +---+ +---+"
	"    +---+ +---+ +---+"
	"    | g | | h | | i |"
	"    +---+ +---+ +---+"
	"     50px  50px  50px"
}

.justify-center {
	grid-kiss:
	"    +---+ +---+ +---+    "
	"    | a | | b | | c |    "
	"    +---+ +---+ +---+    "
	"    +---+ +---+ +---+    "
	"    | d | | e | | f |    "
	"    +---+ +---+ +---+    "
	"    +---+ +---+ +---+    "
	"    | g | | h | | i |    "
	"    +---+ +---+ +---+    "
	"     50px  50px  50px    "
}

.justify-space-between {
	grid-kiss:
	"+---+    +---+    +---+"
	"| a |    | b |    | c |"
	"+---+    +---+    +---+"
	"+---+    +---+    +---+"
	"| d |    | e |    | f |"
	"+---+    +---+    +---+"
	"+---+    +---+    +---+"
	"| g |    | h |    | i |"
	"+---+    +---+    +---+"
	" 50px     50px     50px"
}

.justify-space-evenly {
	grid-kiss:
	"    +---+  +---+  +---+    "
	"    | a |  | b |  | c |    "
	"    +---+  +---+  +---+    "
	"    +---+  +---+  +---+    "
	"    | d |  | e |  | f |    "
	"    +---+  +---+  +---+    "
	"    +---+  +---+  +---+    "
	"    | g |  | h |  | i |    "
	"    +---+  +---+  +---+    "
	"     50px   50px   50px    "
}

.justify-space-around {
	grid-kiss:
	"  +---+    +---+    +---+  "
	"  | a |    | b |    | c |  "
	"  +---+    +---+    +---+  "
	"  +---+    +---+    +---+  "
	"  | d |    | e |    | f |  "
	"  +---+    +---+    +---+  "
	"  +---+    +---+    +---+  "
	"  | g |    | h |    | i |  "
	"  +---+    +---+    +---+  "
	"   50px     50px     50px  "
}
.align-start {
	grid-kiss:
	"+---+ +---+ +---+     "
	"| a | | b | | c | 50px"
	"+---+ +---+ +---+     "
	"+---+ +---+ +---+     "
	"| d | | e | | f | 50px"
	"+---+ +---+ +---+     "
	"+---+ +---+ +---+     "
	"| g | | h | | i | 50px"
	"+---+ +---+ +---+     "
	"                      "
	"                      "
}

.align-end {
	grid-kiss:
	"                      "
	"                      "
	"+---+ +---+ +---+     "
	"| a | | b | | c | 50px"
	"+---+ +---+ +---+     "
	"+---+ +---+ +---+     "
	"| d | | e | | f | 50px"
	"+---+ +---+ +---+     "
	"+---+ +---+ +---+     "
	"| g | | h | | i | 50px"
	"+---+ +---+ +---+     "
}

.align-center {
	grid-kiss:
	"                      "
	"+---+ +---+ +---+     "
	"| a | | b | | c | 50px"
	"+---+ +---+ +---+     "
	"+---+ +---+ +---+     "
	"| d | | e | | f | 50px"
	"+---+ +---+ +---+     "
	"+---+ +---+ +---+     "
	"| g | | h | | i | 50px"
	"+---+ +---+ +---+     "
	"                      "
}

.align-space-between {
	grid-kiss:
	"+---+ +---+ +---+     "
	"| a | | b | | c | 50px"
	"+---+ +---+ +---+     "
	"                      "
	"+---+ +---+ +---+     "
	"| d | | e | | f | 50px"
	"+---+ +---+ +---+     "
	"                      "
	"+---+ +---+ +---+     "
	"| g | | h | | i | 50px"
	"+---+ +---+ +---+     "
}

.align-space-evenly {
	grid-kiss:
	"                      "
	"+---+ +---+ +---+     "
	"| a | | b | | c | 50px"
	"+---+ +---+ +---+     "
	"                      "
	"+---+ +---+ +---+     "
	"| d | | e | | f | 50px"
	"+---+ +---+ +---+     "
	"                      "
	"+---+ +---+ +---+     "
	"| g | | h | | i | 50px"
	"+---+ +---+ +---+     "
	"                      "
}

.align-space-around {
	grid-kiss:
	"                      "
	"+---+ +---+ +---+     "
	"| a | | b | | c | 50px"
	"+---+ +---+ +---+     "
	"                      "
	"                      "
	"+---+ +---+ +---+     "
	"| d | | e | | f | 50px"
	"+---+ +---+ +---+     "
	"                      "
	"                      "
	"+---+ +---+ +---+     "
	"| g | | h | | i | 50px"
	"+---+ +---+ +---+     "
	"                      "
}

.justify-self {
	grid-kiss:
	"+-------+  +-------+  +-------+  +-------+"
	"| <  a  |  | > b < |  | c  >  |  | < d > |"
	"+-------+  +-------+  +-------+  +-------+"
}

.align-self {
	grid-kiss:
	"+-------+  +-------+  +-------+  +-------+"
	"|   ^   |  |   v   |  |       |  |   ^   |"
	"|   a   |  |   b   |  |   c   |  |   d   |"
	"|       |  |   ^   |  |   v   |  |   v   |"
	"+-------+  +-------+  +-------+  +-------+"
}

.grid {
	background-color: #CCC;
	width: 300px;
	height: 300px;
}

.grid-row {
	background-color: #CCC;
	width: 400px;
	height: 100px;
}

.grid, .grid-row {
    background-size: 100px 100px;
    background-image: linear-gradient(135deg, #ddd, #eee);
}

a,b,c,d,e,f,g,h,i {
	display: block;
	box-sizing: border-box;
	font-style: normal;
	font-weight: normal;
	text-align:center;
	background-color: #EEE;
	border: 1px solid black;
	min-width: 40px;
	min-height: 40px;
}

body {
	padding: 1em;
	box-sizing: border-box;
}

li {
	margin-bottom: 1em;
}
`,

		html: format`
<h3>Horizontal alignment of the grid</h3>
<p>Specifies how all the zones are aligned horizontally inside the grid container. Irrelevant if one of the zones fits all the remaining free space.</p>

<ul>

<li><code>justify-content: start</code>
when there are two consecutive spaces or more at the end of the rows

<div class="grid justify-start">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>

<li><code>justify-content: end</code>
when there are two consecutive spaces or more at the beginning of the rows

<div class="grid justify-end">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>


<li><code>justify-content: center</code>
when there are two consecutive spaces or more at the beginning and the end of the rows

<div class="grid justify-center">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>

<li><code>justify-content: space-between</code>
when there are two consecutive spaces or more between zones

<div class="grid justify-space-between">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>

<li><code>justify-content: space-evenly</code>
when there are two consecutive spaces or more at the beginning and the end of the rows, and exactly two consecutive spaces between zones

<div class="grid justify-space-evenly">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>

<li><code>justify-content: space-around</code>
when there are two consecutive spaces or more at the beginning and the end of the rows, and four consecutive spaces or more between zones

<div class="grid justify-space-around">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>

</ul>

<h3>Vertical alignment of the grid</h3>

<p>Specifies how all the zones are aligned vertically inside the grid container. Irrelevant if one of the zones fits all the remaining free space.</p>

<ul>

<li><code>align-content: start</code>
when at least one space row at the end

<div class="grid align-start">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>

<li><code>align-content: end</code>
when at least one space row at the beginning

<div class="grid align-end">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>

<li><code>align-content: center</code>
when at least one space row at the beginning and one space row at the end

<div class="grid align-center">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>

<li><code>align-content: space-between</code>
when there is one space row between zones

<div class="grid align-space-between">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>


<li><code>align-content: space-evenly</code>
when there is one space row at the beginning, at the end and between zones

<div class="grid align-space-evenly">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>

<li><code>align-content: space-around</code>
when there is one space row at the beginning and at the end, and two space rows between zones

<div class="grid align-space-around">
<a>a</a><b>b</b><c>c</c><d>d</d><e>e</e><f>f</f><g>g</g><h>h</h><i>i</i>
</div>
</li>

</ul>

<h3>Horizontal alignment inside a zone</h3>

<p>Each zone can specify an alignment indicator. When no indicators are specified, defaults are stretch horizontally and vertically.</p>

<ul>
<li><code>justify-self: start</code> with <code>&lt;</code> or <code>←</code>
<li><code>justify-self: end</code> with <code>&gt;</code> or <code>→</code></li>
<li><code>justify-self: stretch</code> with <code>&lt;</code> and <code>&gt;</code> or <code>←</code> and <code>→</code> in this order</li>
<li><code>justify-self: center</code> with <code>&gt;</code> and <code>&lt;</code> or <code>→</code> and <code>←</code> in this order</li>
</ul>

<div class="grid-row justify-self">
<a>← a</a>  <b>→ b ←</b>  <c>c →</c>  <d>← d →</d> 
</div>

<h3>Vertical alignment inside a zone</h3>

<ul>
<li><code>align-self: start</code> with <code>^</code> or <code>↑</code></li>
<li><code>align-self: end</code> with <code>v</code> or <code>↓</code></li>
<li><code>align-self: stretch</code> with <code>^</code> and <code>v</code> or <code>↑</code> and <code>↓</code> in this order</li>
<li><code>align-self: center</code> with <code>v</code> and <code>^</code> or <code>↓</code> and <code>↑</code> in this order</li>
</ul>

<div class="grid-row align-self">
<a>↑ a</a>  <b>↓ b ↑</b>  <c>↓ c</c>  <d>↑ d ↓</d>
</div>
`
	}

];

export default presets;