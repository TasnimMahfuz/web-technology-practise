import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import { mkdirp } from 'mkdirp'
import { urlToFileName } from './util.js'

export function spider(url, cb) {
    const filename = urlToFileName(url)
    fs.access(filename, err => {
        if (err && err.code === 'ENOENT') {
            console.log(`Downloading ${url} into ${filename}`)
            superagent.get(url).end((err, res) => {
                if (err) {
                    cb(err)
                } else {
                    mkdirp(path.dirname(filename))
                        .then(() => {
                            fs.writeFile(filename, res.text, err => {
                                if (err) {
                                    cb(err)
                                } else {
                                    cb(null, filename, true)
                                }
                            })
                        })
                        .catch(cb)
                }
            })
        } else {
            cb(null, filename, false)
        }
    })
}
