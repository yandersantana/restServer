var express = require('express');
var exphbs = require('express-handlebars');
var parser = require('body-parser');


var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs = require('fs-extra');


var app = express();

app.use(express.static('public'));

app.engine('handlebars', exphbs({
    defaultLayout: 'plantilla'
}));
app.set('view engine', 'handlebars');


function permitirCrossDomain(req, res, next) {
  //en vez de * se puede definir SÓLO los orígenes que permitimos
  res.header('Access-Control-Allow-Origin', '*'); 
  //metodos http permitidos para CORS
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(permitirCrossDomain);

const pg = require('pg');
pg.defaults.ssl=true;
var conString = "postgres://cvhyoalkzzgrxz:e4ce6729ccb65ceebf73fa431526a000e6cd291220b70edba20806cbef8320f2@ec2-23-21-197-175.compute-1.amazonaws.com:5432/ddl5ce18ndka9t";



app.use(parser.json()); // for parsing application/json
app.use(parser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded



app.get('/cargar', (req, res, next) => {
    const client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query('SELECT * FROM Stories', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            console.log(result);
            client.end();

            return res.json(result.rows);



        });
    });

});

app.get('/usuarios', (req, res, next) => {
    const client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query('SELECT * FROM users', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            console.log(result);
            client.end();

            return res.json(result.rows);

        });
    });

});



app.get('/imagenes/:id', (req, res) => {
    var client = new pg.Client(conString);
    var id = req.params.id;
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query('SELECT * FROM imagens WHERE stories_id=' + id + ';', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);


        });

    });


});

app.get('/audios/:id', (req, res) => {
    var client = new pg.Client(conString);
    var id = req.params.id;
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query('SELECT * FROM audios WHERE stories_id=' + id + ';', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);


        });

    });


});

app.get('/preguntas/:id', (req, res) => {
    var client = new pg.Client(conString);
    var id = req.params.id;
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query('SELECT * FROM questions WHERE stories_id=' + id + ';', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);


        });

    });


});


app.get('/imagenesPreguntas/:id', (req, res) => {
    var client = new pg.Client(conString);
    var id = req.params.id;
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query('SELECT * FROM imagensQuestions WHERE question_id=' + id + ';', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);


        });

    });


});

app.post('/guardarCuento', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("INSERT INTO  stories  (title,  description ,  credits ,  user_id) VALUES ('" + req.body.titulo + "', '" + req.body.descripcion + "', '" + req.body.credito + "', '" + req.body.id_user + "');", function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);


        });

    });


});


app.post('/guardarUsuario', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("INSERT INTO users (username,name) VALUES ('" + req.body.username + "', '" + req.body.name + "');", function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);

        });
    });
});

app.put('/guardarUsuarioActualizado', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("UPDATE users SET username='"+req.body.username+"', name='"+req.body.name+"' WHERE id='" + req.body.idusuario + "';", function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);

        });
    });
});



app.put('/guardarCuentoActualizar', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("UPDATE stories SET title='"+req.body.titulo+"', credits='"+req.body.credito+"', description='"+req.body.descripcion+"' WHERE id='" + req.body.idcuento + "';",function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);


        });

    });


});

app.get('/idCuento', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        client.query('SELECT id FROM stories ORDER BY id DESC ;', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            client.end();
            return res.json(result.rows);


        });


    });


});

app.put('/guardarImagenesActualizadas', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("UPDATE imagens SET src='"+req.body.src+"', id='"+req.body.id+"';", function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);


        });

    });


});


app.post('/guardarImagenes', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("INSERT INTO  imagens  (src,  stories_id) VALUES ('" + req.body.src + "', '" + req.body.id + "');", function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result.rows);


        });

    });


});

app.post('/guardarAudios', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("INSERT INTO  audios  (src ,  stories_id) VALUES ('" + req.body.src + "', '" + req.body.id + "');", function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);


        });

    });


});

app.post('/guardarPregunta', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("INSERT INTO  questions  (question, answer,  stories_id) VALUES ('" + req.body.pregu + "', '" + req.body.respu + "','" + req.body.id + "');", function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);


        });

    });


});

app.post('/guardarPreguntaImagenes', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        if (err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("INSERT INTO  imagensquestions  (src,  question_id) VALUES ('" + req.body.src + "', '" + req.body.id + "');", function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            //console.log(result);
            client.end();
            return res.json(result.rows);


        });

    });


});

app.get('/idPregunta', (req, res) => {
    var client = new pg.Client(conString);
    client.connect(function (err) {
        client.query('SELECT id FROM questions ORDER BY id DESC ;', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            client.end();
            return res.json(result.rows);


        });


    });



});



app.post('/idPreguntaCuento', (req, res) => {
    //console.log(util.inspect(req, false,null));
    var client = new pg.Client(conString);
    client.connect(function (err) {
        client.query('SELECT * FROM questions WHERE stories_id= '+req.body.idcuento+';', function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }
            client.end();
            return res.json(result.rows);


        });


    });


});



app.delete('/eliminarImgPregCuento', (req, res) => {
    
    var client = new pg.Client(conString);
    
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('DELETE FROM imagensquestions WHERE question_id=' + req.body.idpreg + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result);
        });
    });
});



app.delete('/eliminarCuento', (req, res) => {
    var client = new pg.Client(conString);
    
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('DELETE FROM stories WHERE id=' + req.body.idcuento + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result);
        });
    });
});



app.delete('/eliminarImagenesCuento', (req, res) => {
    var client = new pg.Client(conString);
    
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('DELETE FROM imagens WHERE stories_id=' + req.body.idcuento + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result);
        });
    });
});


app.delete('/eliminarAudiosCuento', (req, res) => {
    var client = new pg.Client(conString);
    
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('DELETE FROM audios WHERE stories_id=' + req.body.idcuento + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result);
        });
    });
});

app.delete('/eliminarPreguntasCuento', (req, res) => {
    var client = new pg.Client(conString);
    
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('DELETE FROM questions WHERE id=' + req.body.idpreg + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result);
        });
    });
});


app.get('/cargarCuentoPorId/:id', (req, res) => {
    var client = new pg.Client(conString);
    var idcuento=req.params.id;
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('SELECT * FROM stories WHERE id='+ idcuento +';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
           
        });
        
    });
    
   
});


app.get('/cargarUsuarioPorId/:id', (req, res) => {
    var client = new pg.Client(conString);
    var idusuario=req.params.id;
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('SELECT * FROM users WHERE id='+ idusuario +';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
           
        });
        
    });
    
   
});

app.get('/existeUsuario', (req, res) => {
    var client = new pg.Client(conString);
    console.log(req.body.username);
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('SELECT * FROM users ;', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
            
            //console.log(result);
            client.end();
            return res.json(result.rows);
            
           
        });
        
    });
    
   
});

app.delete('/eliminarUsuario', (req, res) => {
    var client = new pg.Client(conString);
    
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }
       
        client.query('DELETE FROM users WHERE id=' + req.body.idusuario + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }

            client.end();
            return res.json(result);
        });
    });
});






app.get('/listarImagenes/:id', (req, res) => {
    var client = new pg.Client(conString);
     var idcuento=req.params.id;
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM imagens WHERE stories_id=' + idcuento + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
             client.end();
            return res.json(result.rows);         
        });      
    });   
});


app.get('/listarAudios/:id', (req, res) => {
    var client = new pg.Client(conString);
    var idcuento=req.params.id;
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM audios WHERE stories_id=' + idcuento + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
             client.end();
            return res.json(result.rows);         
        });      
    });   
});

app.get('/listarPreguntas/:id', (req, res) => {
    var client = new pg.Client(conString);
    var idcuento=req.params.id;
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM questions WHERE stories_id=' + idcuento + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
             client.end();
            return res.json(result.rows);         
        });      
    });   
});

app.get('/listarImagenesPreguntas/:id', (req, res) => {
    var client = new pg.Client(conString);
    var idpregunta=req.params.id;
    client.connect(function(err) {
        if(err) {
            return console.error('could not connect to postgres', err);
            return res.status(500).json({success: false, data: err});
        }

        client.query('SELECT * FROM imagensquestions WHERE question_id=' + idpregunta + ';', function(err, result) {
            if(err) {
                return console.error('error running query', err);
            }
             client.end();
            return res.json(result.rows);         
        });      
    });   
});


app.listen(process.env.PORT || 8080, function(){console.log("corriendo servidor");});