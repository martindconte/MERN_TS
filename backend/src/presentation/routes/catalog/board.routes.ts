import { Router } from 'express'
import { BoardDatasourceImpl, BoardRepositoyImpl } from '../../../infrastructure'
import { BoardController } from '../../controllers'

//* ROUTE --> api/catalog/board
export class BoardRoutes {

    static get routes(): Router {

        const router = Router()

        const datasource = new BoardDatasourceImpl()
        const boardRespository = new BoardRepositoyImpl( datasource )

        const controller = new BoardController(boardRespository)

        router.route('/')
            .post(controller.create)
            .get(controller.getAll)

        //todo: cambiar a deleted-boards
        router.route('/clean-board')
            .get(controller.getAllDeleted)

        //todo: cambiar route a /deleted-board/:boardid/permanently-delete
        router.route('/clean-board/:boardid/permanently-delete')
        .delete(controller.cleanById)

        router.route('/:boardid')
            .get(controller.getById)
            .put(controller.updateById)
            .delete(controller.deleteById)

        return router
    }

}