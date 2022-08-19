import { rmSync } from 'fs'
import t from 'tap'
import { create, insert, Lyra, search } from '@nearform/lyra'
import { restore, persist } from '../../node-bun'
import { UNSUPPORTED_FORMAT } from '../../common/errors'

function generateTestDBInstance (): Lyra<any> {
  const db = create({
    schema: {
      quote: 'string',
      author: 'string'
    }
  })

  insert(db, {
    quote: 'I am a great programmer',
    author: 'Bill Gates'
  })

  insert(db, {
    quote: 'Be yourself; everyone else is already taken.',
    author: 'Oscar Wilde'
  })

  insert(db, {
    quote: 'I have not failed. I\'ve just found 10,000 ways that won\'t work.',
    author: 'Thomas A. Edison'
  })

  insert(db, {
    quote: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs'
  })

  return db
}

t.test('binary persistence', t => {
  t.plan(3)

  t.test('should generate a persistence file on the disk with random name', t => {
    t.plan(2)

    const db = generateTestDBInstance()
    const q1 = search(db, {
      term: 'way'
    })

    const q2 = search(db, {
      term: 'i'
    })

    // Persist database on disk in binary format
    const path = persist(db, 'binary')

    // Load database from disk in binary format
    const db2 = restore('binary')

    const qp1 = search(db2, {
      term: 'way'
    })

    const qp2 = search(db2, {
      term: 'i'
    })

    // Queries on the loaded database should match the original database
    t.same(q1.hits, qp1.hits)
    t.same(q2.hits, qp2.hits)

    // Clean up
    rmSync(path)
  })

  t.test('should generate a persistence file on the disk with a given name', t => {
    t.plan(2)

    const db = generateTestDBInstance()
    const q1 = search(db, {
      term: 'way'
    })

    const q2 = search(db, {
      term: 'i'
    })

    // Persist database on disk in binary format
    const path = persist(db, 'binary', 'test.dpack')

    // Load database from disk in binary format
    const db2 = restore('binary', 'test.dpack')

    const qp1 = search(db2, {
      term: 'way'
    })

    const qp2 = search(db2, {
      term: 'i'
    })

    // Queries on the loaded database should match the original database
    t.same(q1.hits, qp1.hits)
    t.same(q2.hits, qp2.hits)

    // Clean up
    rmSync(path)
  })

  t.test('should generate a persistence file on the disk using LYRA_DB_NAME env', t => {
    t.plan(3)
    const currentLyraDBNameValue = process.env.LYRA_DB_NAME
    process.env.LYRA_DB_NAME = 'example_db_dump'

    const db = generateTestDBInstance()
    const q1 = search(db, {
      term: 'way'
    })

    const q2 = search(db, {
      term: 'i'
    })

    // Persist database on disk in binary format
    const path = persist(db, 'binary')
    t.match(path, process.env.LYRA_DB_NAME)

    // Load database from disk in binary format
    const db2 = restore('binary', path)

    const qp1 = search(db2, {
      term: 'way'
    })

    const qp2 = search(db2, {
      term: 'i'
    })

    // Queries on the loaded database should match the original database
    t.same(q1.hits, qp1.hits)
    t.same(q2.hits, qp2.hits)

    // Clean up
    rmSync(path)
    process.env.LYRA_DB_NAME = currentLyraDBNameValue
  })
})

t.test('json persistence', t => {
  t.plan(2)

  t.test('should generate a persistence file on the disk with random name and json format', t => {
    t.plan(2)

    const db = generateTestDBInstance()
    const q1 = search(db, {
      term: 'way'
    })

    const q2 = search(db, {
      term: 'i'
    })

    // Persist database on disk in json format
    const path = persist(db, 'json')

    // Load database from disk in json format
    const db2 = restore('json')

    const qp1 = search(db2, {
      term: 'way'
    })

    const qp2 = search(db2, {
      term: 'i'
    })

    // Queries on the loaded database should match the original database
    t.same(q1.hits, qp1.hits)
    t.same(q2.hits, qp2.hits)

    // Clean up
    rmSync(path)
  })

  t.test('should generate a persistence file on the disk with a given name and json format', t => {
    t.plan(2)

    const db = generateTestDBInstance()
    const q1 = search(db, {
      term: 'way'
    })

    const q2 = search(db, {
      term: 'i'
    })

    // Persist database on disk in json format
    const path = persist(db, 'json', 'test.json')

    // Load database from disk in json format
    const db2 = restore('json', 'test.json')

    const qp1 = search(db2, {
      term: 'way'
    })

    const qp2 = search(db2, {
      term: 'i'
    })

    // Queries on the loaded database should match the original database
    t.same(q1.hits, qp1.hits)
    t.same(q2.hits, qp2.hits)

    // Clean up
    rmSync(path)
  })
})

t.test('dpack persistence', t => {
  t.plan(2)

  t.test('should generate a persistence file on the disk with random name and dpack format', t => {
    t.plan(2)

    const db = generateTestDBInstance()
    const q1 = search(db, {
      term: 'way'
    })

    const q2 = search(db, {
      term: 'i'
    })

    // Persist database on disk in dpack format
    const path = persist(db, 'dpack')

    // Load database from disk in dpack format
    const db2 = restore('dpack')

    const qp1 = search(db2, {
      term: 'way'
    })

    const qp2 = search(db2, {
      term: 'i'
    })

    // Queries on the loaded database should match the original database
    t.same(q1.hits, qp1.hits)
    t.same(q2.hits, qp2.hits)

    // Clean up
    rmSync(path)
  })

  t.test('should generate a persistence file on the disk with a given name and dpack format', t => {
    t.plan(2)

    const db = generateTestDBInstance()
    const q1 = search(db, {
      term: 'way'
    })

    const q2 = search(db, {
      term: 'i'
    })

    // Persist database on disk in json format
    const path = persist(db, 'dpack', 'test.dpack')

    // Load database from disk in json format
    const db2 = restore('dpack', 'test.dpack')

    const qp1 = search(db2, {
      term: 'way'
    })

    const qp2 = search(db2, {
      term: 'i'
    })

    // Queries on the loaded database should match the original database
    t.same(q1.hits, qp1.hits)
    t.same(q2.hits, qp2.hits)

    // Clean up
    rmSync(path)
  })
})

t.test('errors', t => {
  t.plan(2)

  t.test('should throw an error when trying to persist a database in an unsupported format', t => {
    t.plan(1)

    const db = generateTestDBInstance()
    try {
      // @ts-expect-error - 'unsupported' is not a supported format
      persist(db, 'unsupported')
    } catch ({ message }) {
      t.match(message, 'Unsupported serialization format: unsupported')
    }
  })

  t.test('should throw an error when trying to restore a database from an unsupported format', t => {
    t.plan(1)

    const format = 'unsupported'

    const db = generateTestDBInstance()
    const path = persist(db, 'binary', 'supported')
    try {
      // @ts-expect-error - 'unsupported' is not a supported format
      restore(format, path)
    } catch ({ message }) {
      t.match(message, UNSUPPORTED_FORMAT(format))
      rmSync(path)
    }
  })
})
