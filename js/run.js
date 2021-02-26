document.getElementById('runbutton').addEventListener('click', (e) => {
    var output = $('#output');
    output.text('');
    output.append("Python 3.7 on PyPlay\n--------------------\n");
        
    function outf(text) { 
        document.getElementById('output').innerText += text.toString();
    } 
    function builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            return
        return Sk.builtinFiles["files"][x];
    }

    function runit() { 
        var prog = editor.getValue();
        Sk.configure({output:outf, read:builtinRead, sysargv: [], __future__: Sk.python3}); 
        Sk.canvas = "mycanvas";
        if (editor.getValue().indexOf('turtle') > -1 ) {
            $('#mycanvas').show()
        }
        Sk.pre = "output";
        (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
        var myPromise = Sk.misceval.asyncToPromise(function() {
            try {
                return Sk.importMainWithBody('<stdin>', false, prog, true);
            } catch (err) {
                console.log(err.toString());
                document.getElementById('output').innerText += err.toString();
            }
        });
        myPromise.then(function(mod) {
            console.log('success');
        },
            function(err) {
            console.log(err.toString());
            document.getElementById('output').innerText += err.toString();
        });
    }
    runit()
});