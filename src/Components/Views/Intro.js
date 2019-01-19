import React from 'react'
import Typography from "@material-ui/core/Typography"
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const styles = {}

export default withStyles(styles)(() => {
    return (
        <div>
            <Typography variant="headline">Herzlichen Willkommen in der Erstellung deines Fate-Charakters!</Typography>
            <Typography variant="body1">
                Nimm dir beim Ausfüllen der auf den nächsten Seiten angegebenen Felder ruhig Zeit,
                denn die meisten gewählten Eigenschaften können im Nachhinein nicht mehr geändert werden.
            </Typography>
            <Typography variant="body1">
                Falls du dich in der Welt von Fate nicht gut auskennst und verunsichert bist,
                kannst du dich mit Fragen gerne im Fate-Alpha Discord ( https://discord.gg/CWw2JeR ) an
                die anwesenden Mitspieler und Admin wenden.
            </Typography>
            <Typography variant="body1">
                Weitere Tipps:
            </Typography>
            <List>
                <ListItem>
                    <ListItemText>
                        Sämtliche Informationen beziehen sich auf deinen bespielten Charakter, nicht auf dein wirkliches Ich.
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        Das Rollenspiel konzentriert sich auf die fiktive Kleinstadt Fuyuki in
                        Japan, daher werden die meisten Charaktere auch japanische Namen besitzen.
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        Es wird kein Wissen über Fate oder die verwandten Werke vorausgesetzt.
                        Das Rollenspiel selbst konzentriert sich auf Abenteuer innerhalb der Welt von Fate und hängt
                        nur bedingt mit den Geschehnissen des Franchises zusammen.
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        Die auf späteren Seiten der Charakter-Erstellung angezeigten Optionen können sich je nachdem was
                        bei vorherigen Optionen gewählt wurde unterscheiden. So sind bestimmte Unterklassen nur
                        Spielern mit bestimmten Klassen und Traits zugänglich.
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        Solange die Charakter-Erstellung noch nicht abgeschlossen wurde, ist es jederzeit
                        möglich auf vorherige Seiten zurück zu kehren um Änderungen vorzunehmen.
                    </ListItemText>
                </ListItem>
            </List>
            <Typography variant="body1">
                Viel Spaß
            </Typography>
        </div>
    )
});